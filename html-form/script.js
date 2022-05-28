// defaults

const defaultErrorMessage = `This field can only use these special characters "_", "-", "+", but cannot start with them.`;

const defaultFieldValidationsRegexPattern =
  /^[a-zA-Z0-9]+(?:[-_+][a-zA-Z0-9]+)*$/;
// this pattern validates
// ** value does not start with - _ +
// ** no special characters other than - _ +

// targets
const form = document.getElementById("form");
const pipelineNameInput = document.getElementById("pipline-name-input");
const projectIdInput = document.getElementById("project-id-input");
const bucketNameInput = document.getElementById("bucket-name-input");
const cloudStorageFilesInput = document.getElementById(
  "cloud-storage-files-input"
);
const credentialsInput = document.getElementById("credentials-input");
const runIntervalInput = document.getElementById("run-interval-input");

// form submission handler
form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  // to prevent default reloading behavior after from submission
  e.preventDefault();

  // asuming every field is not empty and has min 5 characters
  // now compare with regex pattern to exclude special characters other than - _ +
  // make sure value does not start with - _ +

  //   validating form fields against default regex pattern defined at start of script
  const piplineNameIsValid = validator(pipelineNameInput, {
    errorID: "pipline-name-error-id",
  });

  const projectIdIsValid = validator(projectIdInput, {
    errorID: "project-id-error-id",
  });

  const bucketNameIsValid = validator(bucketNameInput, {
    errorID: "bucket-name-error-id",
  });

  const cloudStorageIsValid = validator(cloudStorageFilesInput, {
    errorID: "cloud-storage-error-id",
  });

  const credentialsAreValid = validator(credentialsInput, {
    errorID: "credentials-error-id",
  });

  if (
    piplineNameIsValid &&
    projectIdIsValid &&
    bucketNameIsValid &&
    cloudStorageIsValid &&
    credentialsAreValid
  ) {
    //   all fields are valid
    const submission = {
      cloudStorage: "Google Cloud Storage",
      pipelineName: pipelineNameInput.value,
      projectId: projectIdInput.value,
      bucketName: bucketNameInput.value,
      cloudStorageLocation: cloudStorageFilesInput.value,
      credentials: credentialsInput.value,
      runInterval: runIntervalInput.value,
    };
    console.log(submission); // logs submisison to the console
    alert(JSON.stringify(submission, null, "\t")); // prints the submission as alert
  }
}

const validator = (input, options) => {
  const { pattern, errorID, errorMessage } = options;

  // if individual errorMessage for field was provided then that will be displayed
  // otherwise this default errorMessage
  const errorMsg = errorMessage || defaultErrorMessage;

  // if individual regex pattern for field was provided then that will be checked
  // otherwise the default pattern
  const regexPattern = pattern || defaultFieldValidationsRegexPattern;

  const isValid = regexPattern.test(input.value);

  if (!isValid) {
    // if field is not valid then show errorMsg
    if (document.getElementById(errorID)) {
      document.getElementById(errorID).textContent = errorMsg;
    }
  } else {
    //   if valid remove previous error message [if any]
    document.getElementById(errorID).textContent = "";
  }

  return isValid;
};

function ressetForm() {
  pipelineNameInput.value = "";
  projectIdInput.value = "";
  bucketNameInput.value = "";
  cloudStorageFilesInput.value = "";
  credentialsInput.value = "";
  runIntervalInput.value = "";
}
