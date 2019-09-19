const Sequelize = require('sequelize');
const { UUID, UUIDV4, BOOLEN, STRING, DECIMAL } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-product-offerings_db');

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
Company.haMany(Product)

Offering.belongTo(Product);
Product.hasMany(Offering);


const mapAndCreate 