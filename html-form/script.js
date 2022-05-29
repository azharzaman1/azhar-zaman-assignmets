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

// form submission handling
form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  // to prevent default reloading behavior after from submission
  e.preventDefault();

  const piplineNameIsValid = validator(pipelineNameInput, {
    errorID: "pipline-name-error-id",
    pattern: /^[a-zA-Z0-9]+(?:[-_+ ][a-zA-Z0-9]+)*$/, // cannot start with - _ +
    errorMessage: 'This field cannot start with "-", "_", "+"',
  });

  const credentialsAreValid = validator(credentialsInput, {
    errorID: "credentials-error-id",
    pattern: /^[a-zA-Z0-9]+(?:[-_+ ][a-zA-Z0-9]+)*$/, // cannot start with - _ +
    errorMessage: 'This field cannot start with "-", "_", "+"',
  });

  const projectIdIsValid = validator(projectIdInput, {
    errorID: "project-id-error-id",
    pattern: /^[a-zA-Z0-9]+(?:[-_+ ][a-zA-Z0-9]+)*$/, // cannot start with - _ +
    errorMessage: 'This field cannot start with "-", "_", "+"',
  });

  const bucketNameIsValid = true; // as bucket name can have special characters
  const cloudStorageIsValid = true; // as bucket name can have special characters

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

  const isValid = pattern.test(input.value);

  if (!isValid) {
    // if field is not valid then show errorMessage
    if (document.getElementById(errorID)) {
      document.getElementById(errorID).textContent = errorMessage;
    }
  } else {
    // if valid remove previous error message [if any]
    document.getElementById(errorID).textContent = "";
  }

  return isValid;
};

// reset form on click cancel
function ressetForm() {
  pipelineNameInput.value = "";
  projectIdInput.value = "";
  bucketNameInput.value = "";
  cloudStorageFilesInput.value = "";
  credentialsInput.value = "";
  runIntervalInput.value = "";
}
