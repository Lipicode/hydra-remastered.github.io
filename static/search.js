"use strict";

/**
 * Converts user input into a fully qualified URL. It attempts to interpret the input as:
 * 1. A valid URL with protocol.
 * 2. A valid URL after prepending "http://".
 *
 * @param {string} input - The user's input, which may be a URL or a search query.
 * @param {string} template - The search template containing "%s" as a placeholder for the query.
 * @returns {string} The fully qualified URL or search URL.
 */
function search(input, template) {
  // Trim the input to remove any extra whitespace.
  input = input.trim();

  // If the input is empty, return the search URL with an empty query.
  if (!input) {
    return template.replace("%s", "");
  }

  // Attempt 1: Check if the input is already a valid URL.
  try {
    const url = new URL(input);
    return url.toString();
  } catch (err) {
    // Input is not a valid URL with protocol. Continue to next attempt.
  }

  // Attempt 2: Prepend "http://" and try again.
  try {
    const url = new URL(`http://${input}`);
    // Validate the hostname by ensuring it contains at least one dot.
    if (url.hostname.includes(".")) {
      return url.toString();
    }
  } catch (err) {
    // The input is still not a valid URL. Continue to treat it as a search query.
  }

  // If the input cannot be interpreted as a URL, treat it as a search query.
  // Warn if the template does not include the "%s" placeholder.
  if (!template.includes("%s")) {
    console.warn('Search template does not include a "%s" placeholder.');
  }

  return template.replace("%s", encodeURIComponent(input));
}
