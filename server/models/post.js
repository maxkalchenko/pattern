import modelbase from 'bookshelf-modelbase';
import bookshelf from '../bookshelf';

export default modelbase(bookshelf).extend({
  tableName: 'posts'
});
