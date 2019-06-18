const CommentsExtractor = require('comments-extractor');

const Task = require('./Task');

/**
 * Gulpdoc class.
 */
class Gulpdoc {
  /**
   * Get tasks.
   *
   * @param {string} pattern - Glob pattern.
   * @param {string} [annotation='gulptask'] - Annotation.
   * @param {object} [options={}] - Glob options.
   * @returns {Array<Task>} Tasks array.
   */
  static getTasks(pattern, annotation = 'gulptask', options = {}) {
    const extractor = new CommentsExtractor(pattern, annotation, options);
    const comments = extractor.extract();
    const tasks = [];

    comments.forEach((fileComments) => {
      fileComments.forEach((comment) => {
        const task = new Task(comment, annotation);
        tasks.push(task);
      });
    });

    return tasks;
  }
}

module.exports = Gulpdoc;
