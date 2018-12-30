const ERROR = {
    GET_ORGANIZATION: 'GET_ORGANIZATION_ERROR',
    GET_META_DATA_ORGANIZATION: 'GET_META_DATA_ORGANIZATION_ERROR', 
    GET_ORGANIZATION_MEMBERS : 'GET_ORGANIZATION_MEMBERS_ERROR',
    GET_ORG_IDENTITY:'GET_ORG_IDENTITY_ERROR',

    //socials
    GET_ORG_FOLLOWERS:'GET_ORG_FOLLOWERS_ERROR',
    GET_ORG_FOLLOWINGS:'GET_ORG_FOLLOWINGS_ERROR',
    GET_ORG_EXCHANGES: 'GET_ORG_EXCHANGES_ERROR',
    GET_ORG_FOLLOWINGS_IDENTITIES:'GET_ORG_FOLLOWINGS_IDENTITIES_ERROR',
    GET_ORG_FOLLOWERS_IDENTITIES:'GET_ORG_FOLLOWERS_IDENTITIES_ERROR',
    //organization - abilities
    GET_ABILITIES: 'GET_ORG_ABILITIES_ERROR',
    UPDATE_ABILITY: 'UPDATE_ORG_ABILITY_ERROR',
    CREATE_ABILITY: 'CREATE_ORG_ABILITY_ERROR',
    DELETE_ABILITY: 'DELETE_ORG_ABILITY_ERROR',
    //organization - basic information
    UPDATE_ORGANIZATION_INFO: 'UPDATE_ORGANIZATION_INFO_ERROR',
    //productsae
    GET_PRODUCTS: 'GET_ORG_PRODUCTS_ERROR',
    //get products

    //organization - certificate
    GET_ORG_CERTIFICATES:'GET_ORG_CERTIFICATES_ERROR',
    UPDATE_CERTIFICATE:'UPDATE_ORG_CERTIFICATE_ERROR',
    CREATE_CERTIFICATE:'CREATE_ORG_CERTIFICATE_ERROR',
    DELETE_CERTIFICATE:'DELETE_ORG_CERTIFICATE_ERROR',
    //ORGANIZATION - CUSTOMER
    GET_CUSTOMERS_BY_ORGANIZATION_ID:'GET_CUSTOMERS_BY_ORGANIZATION_ID_ERROR',
    GET_CUSTOMER_BY_CUSTOMER_ID:'GET_CUSTOMER_BY_CUSTOMER_ID_ERROR',
    UPDATE_CUSTOMER:'UPDATE_ORG_CUSTOMER_ERROR',
    CREATE_CUSTOMER:'CREATE_ORG_CUSTOMER_ERROR',
    DELETE_CUSTOMER:'DELETE_ORG_CUSTOMER_ERROR',
    //ORGANIZATION - PRODUCTS
    UPDATE_PRODUCT: 'UPDATE_ORG_PRODUCT_ERROR',
    CREATE_PRODUCT : 'CREATE_ORG_PRODUCT_ERROR',
    DELETE_PRODUCT : 'DELETE_ORG_PRODUCT_ERROR',
    ADD_PRODUCT_PICTURE : 'ADD_ORG_PRODUCT_PICTURE_ERROR',
    DELETE_PICTURE: 'DELETE_ORG_PICTURE_ERROR',
    GET_PRODUCT_CATEGORIES : 'GET_PRODUCT_CATEGORIES_ERROR',
    GET_PRODUCT_PICTURE:'GET_PRODUCT_PICTURE_ERROR',
    GET_PRODUCT_PRICE:"GET_PRODUCT_PRICE_ERROR",
    
    //STAFF
    GET_STAFF:'GET_ORG_STAFF_ERROR',

    //AGENCY
    AGENCY_REQUEST:'AGENCY_REQUEST_ERROR',
}

const SUCCESS = {
    //ORGANIZATION - 
    GET_ORGANIZATION: 'GET_ORGANIZATION_SUCCESS',
    GET_META_DATA_ORGANIZATION:'GET_META_DATA_ORGANIZATION_SUCCESS',
    // GET_ORGANIZATION:'GET_ORGANIZATION_SUCCESS',
    GET_ORGANIZATION_MEMBERS:'GET_ORGANIZATION_MEMBERS_SUCCESS',
    GET_ORG_IDENTITY:'GET_ORG_IDENTITY_SUCCESS',
    GET_ORG_FOLLOWINGS_IDENTITIES:'GET_ORG_FOLLOWINGS_IDENTITIES_SUCCESS',
    GET_ORG_FOLLOWERS_IDENTITIES:'GET_ORG_FOLLOWERS_IDENTITIES_SUCCESS',
    //organization - abilities
    GET_ABILITIES: 'GET_ORG_ABILITIES_SUCCESS',
    DELETE_ABILITY: 'DELETE_ORG_ABILITY_SUCCESS',
    UPDATE_ABILITY:'UPDATE_ORG_ABILITY_SUCCESS',
    CREATE_ABILITY: 'CREATE_ORG_ABILITY_SUCCESS',
    //organization - basic information
    UPDATE_ORGANIZATION_INFO: 'UPDATE_ORGANIZATION_INFO_SUCCESS',
    SET_ORGANIZATION_INFO_MEDIA:'SET_ORGANIZATION_INFO_MEDIA_SUCCESS',
    //get products
    GET_PRODUCTS: 'GET_ORG_PRODUCTS_SUCCESS',
    //socials
    GET_ORG_FOLLOWERS: 'GET_ORG_FOLLOWERS_SUCCESS', // FixMe: Amir = Duplicated declaration
    GET_ORG_FOLLOWINGS: 'GET_ORG_FOLLOWINGS_SUCCESS',
    GET_ORG_EXCHANGES: 'GET_ORG_EXCHANGES_SUCCESS',
    //organization - certificate 
    GET_ORG_CERTIFICATES: 'GET_ORG_CERTIFICATES_SUCCESS',
    DELETE_CERTIFICATE:'DELETE_ORG_CERTIFICATE_SUCCESS',
    UPDATE_CERTIFICATE:'UPDATE_ORG_CERTIFICATE_SUCCESS',
    CREATE_CERTIFICATE:'CREATE_ORG_CERTIFICATE_SUCCESS',
    //ORGANIZATION - CUSTOMER
    GET_CUSTOMERS_BY_ORGANIZATION_ID:'GET_CUSTOMERS_BY_ORGANIZATION_ID_SUCCESS',
    GET_CUSTOMER_BY_CUSTOMER_ID:'GET_CUSTOMER_BY_CUSTOMER_ID_SUCCESS',
    DELETE_CUSTOMER:'DELETE_ORG_CUSTOMER_SUCCESS',
    UPDATE_CUSTOMER:'UPDATE_ORG_CUSTOMER_SUCCESS',
    CREATE_CUSTOMER:'CREATE_ORG_CUSTOMER_SUCCESS',
    //ORGANIZATION - PRODUCTS
    UPDATE_PRODUCT: 'UPDATE_ORG_PRODUCT_SUCCESS',
    CREATE_PRODUCT : 'CREATE_ORG_PRODUCT_SUCCESS',
    DELETE_PRODUCT : 'DELETE_ORG_PRODUCT_SUCCESS',
    DELETE_PICTURE: 'DELETE_ORG_PICTURE_SUCCESS',
    ADD_PRODUCT_PICTURE : 'ADD_ORG_PRODUCT_PICTURE_SUCCESS',
    GET_PRODUCT_CATEGORIES : 'GET_PRODUCT_CATEGORIES_SUCCESS',
    GET_PRODUCT_PICTURE:'GET_PRODUCT_PICTURE_SUCCESS',
    GET_PRODUCT_PRICE:'GET_PRODUCT_PRICE_SUCCESS',
    ADD_PRODUCT:'ADD_ORG_PRODUCT_SUCCESS',

    //STAFF
    GET_STAFF:'GET_ORG_STAFF_SUCCESS',

    //AGENCY
    AGENCY_REQUEST:'AGENCY_REQUEST_SUCCESS',
}

const BASE = {
    //ORGANIZATION -
    GET_ORGANIZATION: 'GET_ORGANIZATION',
    GET_META_DATA_ORGANIZATION: 'GET_META_DATA_ORGANIZATION',
    GET_ORGANIZATION_MEMBERS : 'GET_ORGANIZATION_MEMBERS',
    GET_ORG_IDENTITY:'GET_ORG_IDENTITY',

    //socials
    GET_ORG_FOLLOWERS:'GET_ORG_FOLLOWERS',
    GET_ORG_FOLLOWINGS:'GET_ORG_FOLLOWINGS',
    GET_ORG_EXCHANGES: 'GET_ORG_EXCHANGES',
    GET_ORG_FOLLOWINGS_IDENTITIES:'GET_ORG_FOLLOWINGS_IDENTITIES',
    GET_ORG_FOLLOWERS_IDENTITIES:'GET_ORG_FOLLOWERS_IDENTITIES',
    //organization - abilities
    GET_ABILITIES: 'GET_ORG_ABILITIES',
    UPDATE_ABILITY: 'UPDATE_ORG_ABILITY',
    CREATE_ABILITY: 'CREATE_ORG_ABILITY',
    DELETE_ABILITY: 'DELETE_ORG_ABILITY',
    //organization - basic information
    UPDATE_ORGANIZATION_INFO: 'UPDATE_ORGANIZATION_INFO',
    SET_ORGANIZATION_INFO_MEDIA:'SET_ORGANIZATION_INFO_MEDIA',
    //products
    GET_PRODUCTS: 'GET_ORG_PRODUCTS',
    //get products

    //organization - certificate
    GET_ORG_CERTIFICATES:'GET_ORG_CERTIFICATES',
    UPDATE_CERTIFICATE:'UPDATE_ORG_CERTIFICATE',
    CREATE_CERTIFICATE:'CREATE_ORG_CERTIFICATE',
    DELETE_CERTIFICATE:'DELETE_ORG_CERTIFICATE',
    //ORGANIZATION - CUSTOMER
    GET_CUSTOMERS_BY_ORGANIZATION_ID:'GET_CUSTOMERS_BY_ORGANIZATION_ID',
    GET_CUSTOMER_BY_CUSTOMER_ID:'GET_CUSTOMER_BY_CUSTOMER_ID',
    UPDATE_CUSTOMER:'UPDATE_ORG_CUSTOMER',
    CREATE_CUSTOMER:'CREATE_ORG_CUSTOMER',
    DELETE_CUSTOMER:'DELETE_ORG_CUSTOMER',
    //ORGANIZATION - PRODUCTS
    UPDATE_PRODUCT: 'UPDATE_ORG_PRODUCT',
    CREATE_PRODUCT : 'CREATE_ORG_PRODUCT',
    DELETE_PRODUCT : 'DELETE_ORG_PRODUCT',
    ADD_PRODUCT_PICTURE : 'ADD_ORG_PRODUCT_PICTURE',
    DELETE_PICTURE: 'DELETE_ORG_PICTURE',
    GET_PRODUCT_PICTURE: 'GET_PRODUCT_PICTURE',
    ADD_PRODUCT:'ADD_ORG_PRODUCT',
    //PRICE
    GET_PRODUCT_PRICE:'GET_PRODUCT_PRICE',

    //Staff
    GET_STAFF:'GET_ORG_STAFF',

    //AGENCY 
    AGENCY_REQUEST:'AGENCY_REQUEST',
}


export default {
  SUCCESS,
  ERROR,
  BASE
}