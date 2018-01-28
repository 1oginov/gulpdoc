/**
 * Task class.
 */
class Task {
  /**
   * Parse block comment.
   * @param {string} comment
   * @param {string} annotation
   * @return {{name: string, description: string}}
   */
  static parseBlockComment(comment, annotation) {
    const lines = comment.split(/\n+/).
        map((line) => line.replace('*', '').trim()).
        filter((line) => line.length > 0);

    let i = 0;
    let name = '';

    for (; i < lines.length; i++) {
      const words = lines[i].split(/\s+/);

      if (words[0].toLowerCase().startsWith('@' + annotation)) {
        if (!words[1]) {
          throw new Error('Block comment describing Gulp task should have ' +
              `task name after @${annotation}`);
        }

        name = words[1];
        break;
      }
    }

    let description = '';

    for (let j = 0; j < i; j++) {
      description += lines[j] + '\n';
    }

    description = description.trim();

    return {name, description};
  }

  /**
   * Parse line comment.
   * @param {string} comment
   * @param {string} annotation
   * @return {{name: string, description: string}}
   */
  static parseLineComment(comment, annotation) {
    const words = comment.trim().split(/\s+/);

    if (!words[0].toLowerCase().startsWith('@' + annotation)) {
      throw new Error('Line comment describing Gulp task should starts with ' +
          `@${annotation} (case insensitive)`);
    }

    if (!words[1]) {
      throw new Error('Line comment describing Gulp task should have task ' +
          `name after @${annotation}`);
    }

    const name = words[1];
    let description = '';

    if (words[2]) {
      for (let i = 2; i < words.length; i++) {
        description += words[i] + ' ';
      }
    }

    description = description.trim();

    return {name, description};
  }

  /**
   * Task constructor.
   * @param {Object} comment
   * @param {string} annotation
   */
  constructor(comment, annotation) {
    if (['Block', 'Line'].indexOf(comment.type) === -1) {
      throw new Error(`Unknown comment type ${comment.type}`);
    }

    if (!comment.value) {
      throw new Error('Empty comment value');
    }

    let name;
    let description;

    if (comment.type === 'Block') {
      ({name, description} = this.constructor.
          parseBlockComment(comment.value, annotation));
    } else {
      ({name, description} = this.constructor.
          parseLineComment(comment.value, annotation));
    }

    this.name = name;
    this.description = description;
  }
}

module.exports = Task;
