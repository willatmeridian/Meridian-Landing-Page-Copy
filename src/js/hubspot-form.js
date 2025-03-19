// HubSpot Forms Script
const loadHubSpotForm = () => {
  // Load HubSpot Forms Script
  const script = document.createElement('script');
  script.charset = 'utf-8';
  script.type = 'text/javascript';
  script.src = '//js.hsforms.net/forms/embed/v2.js';
  script.addEventListener('load', () => {
    // Create the form once the script is loaded
    hbspt.forms.create({
      portalId: "23919538",
      formId: "cbbbb152-c942-43ab-a4c2-8521bea2fbe4",
      region: "na1",
      target: '#hubspot-form-container',
      css: '',
      cssClass: 'hs-form',
      submitButtonClass: 'hs-submit-btn',
      errorClass: 'hs-error',
      errorMessageClass: 'hs-error-message',
      customStyles: {
        fontFamily: '"quiet-sans", sans-serif',
      }
    });
  });
  document.head.appendChild(script);
};

// Initialize form when the DOM is ready
document.addEventListener('DOMContentLoaded', loadHubSpotForm);
