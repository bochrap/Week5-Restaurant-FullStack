import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price INTEGER,
    category TEXT,
    image TEXT
  )
`);

db.exec(`
    INSERT INTO menu (name, description, price, category, image)
    VALUES
    ('Fish and Chips', 'Classic deep-fried fish fillets served with thick-cut fries', 12.99, 'mains','./client/menu-imgs/fishandchips.jpg),
    ('Shepherd's Pie', 'Ground lamb cooked with vegetables, topped with mashed potatoes', 10.99, 'mains','./client/menu-imgs/shepherdspie_2077_16x9.jpg),
    ('Bangers and Mash', 'Sausages served with creamy mashed potatoes and onion gravy',  9.99, 'mains','./client/menu-imgs/bangersandmash.jpg),
    ('Ploughman's Platter', 'Assorted cheeses, pickles, and bread with butter',  8.99, 'sides','./client/menu-imgs/ploughmansplatter.jpg),
    ('Bubble and Squeak', 'Pan-fried leftovers, typically potatoes and cabbage',  6.99, 'sides','./client/menu-imgs/bubbleandsqueak.jpg),
    ('Yorkshire Pudding', 'Baked batter pudding, often served with roast beef', 5.99, 'sides','./client/menu-imgs/yorkiepudding.jpg),
    ('"English Breakfast Tea', 'Traditional black tea served with milk and sugar', 2.99, 'drinks','./client/menu-imgs/englishtea.jpg),
    ('Pimm's Cup', 'Refreshing cocktail with Pimm's No. 1, fruit, and soda', 7.99, 'drinks','./client/menu-imgs/pimmscup.jpg),
    ('Lemonade', 'Homemade lemonade with fresh lemons and sugar', 3.99, 'drinks','./client/menu-imgs/lemonade.jpg)
`);