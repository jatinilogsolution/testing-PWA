export const copyToClipboard = (text: string) => {
  // Create a temporary input element to hold the text
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);

  // Select and copy the text
  tempInput.select();
  document.execCommand("copy");

  // Remove the temporary input element
  document.body.removeChild(tempInput);
};
