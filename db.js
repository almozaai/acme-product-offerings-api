const Sequelize = require('sequelize');
const { UUID, UUIDV4, BOOLEN, STRING, DECIMAL } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_product_offerings_db');

const uuidDefinition = {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
}

const Company = conn.define('company', {
    id: uuidDefinition,
    name: {
        type: STRING,
        allowNull: false,
        unique: true
    }
})

const Product = conn.define('product', {
    id: uuidDefinition,
    name: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    suggestedPrice: DECIMAL
})

const Offering = conn.define('offering', {
    id: uuidDefinition,
    price: DECIMAL
})

Product.belongsTo(Company);
Company.hasMany(Product)

Offering.belongsTo(Product);
Product.hasMany(Offering);

Offering.belongsTo(Company);
Company.hasMany(Offering);


const mapAndCreate = (items, model) => Promise.all(items.map(item => model.create(item)));

const syncAndSeed = async () => {
    await conn.sync({ force: true });

    const companies = [
        { name: 'Acme US' },
        { name: 'Acme GLOBAL' },
        { name: 'Acme TRI-STATE' },
    ]
    const [US, GLOBAL, TRISTATE] = await mapAndCreate(companies, Company);
   
    const products = [
        { name: 'bar', suggestedPrice: 6,  companyId: US.id },
        { name: 'bazz', suggestedPrice: 6, companyId: US.id},
        { name: 'foo', suggestedPrice: 6, companyId: GLOBAL.id},
        { name: 'quq', suggestedPrice: 6, companyId: TRISTATE.id}
    ]
    const [bar, bazz, foo, quq] = await mapAndCreate(products, Product);
   
    const offerings = [
        { companyId: US.id, productId: bar.id },
        { companyId: US.id, productId: bazz.id },
        { companyId: GLOBAL.id, productId: foo.id },
        { companyId: TRISTATE.id, productId: quq.id }
    ]
    const [offering1, offering2, offering3, offering4] = await mapAndCreate(offerings, Offering);
}

syncAndSeed();