import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export default class ItemService {
  constructor() {
    const adapter = new FileSync('db.json');
    this.db = low(adapter);

    const now = new Date();

    this.db.defaults({ items: [
      {
        id: 1,
        name: 'item',
        code: 123,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        name: 'item',
        code: 123,
        createdAt: now,
        updatedAt: now,
      },
    ] }).write();
  }

  list({ limit = 100, offset = 0 }) {
    return this.db.get('items')
      .slice(Number.parseInt(offset, 10), Number.parseInt(limit, 10)).value();
  }

  save({ id, name, code }) {
    if (id !== undefined) {
      console.log(id);
      const item = this.db.get('items').find({
        id
      });

      if (name !== undefined) {
        item.set('name', name);
      }

      if (code !== undefined) {
        item.set('code', code);
      }

      return item.write();
    }

    const newId = this.db.get('items').value().length + 1;
    const now = new Date();
    this.db.get('items').push({
      id: newId,
      name,
      code,
      createdAt: now,
      updatedAt: now,
    }).write();

    return newId;
  }

  erase(id) {
    console.log(this.db.get('items').pull({ id }));
    return this.db.get('items').pull({ id }).value();
  }
}
