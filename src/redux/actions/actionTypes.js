export const SUCCESS = '_SUCCESS'
export const FAILED = '_FAILED'
export const REQUEST = '_REQUEST'

const types = {
	FETCH_SUCCEEDED:'FETCH_SUCCEEDED',
	FETCH_POSTS:'FETCH_POSTS',
	RECEIVE_POSTS:'RECEIVE_POSTS',
	ADD_NUMBER:'ADD_NUMBER',
	SUBTRACT_NUMBER:'SUBTRACT_NUMBER',
	FETCH_FAILED: 'FETCH_FAILED',
	FETCH_USERS: 'FETCH_USERS',
	
	// auth types
	SIGN_IN: 'SIGN_IN',
	SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
	SIGN_IN_FAILED: 'SIGN_IN_FAILED',
	SIGN_IN_ERROR: 'SIGN_IN_ERROR',
	SIGN_OUT:'SIGN_OUT',
	SIGN_OUT_FINISHED:'SIGN_OUT_FINISHED',
	
	//error types
	ERRORS: {
		SIGN_IN: 'SIGN_IN_ERROR',
		GET_ORGANIZATION: 'GET_ORGANIZATION_ERROR',
		GET_ORGANIZATION_MEMBERS : 'GET_ORGANIZATION_MEMBERS_ERROR',
		UPDATE_ORGANIZATION_INFO: 'UPDATE_ORGANIZATION_INFO_ERROR',
		GET_USER_IDENTITY:'GET_ORG_IDENTITY_ERROR',
		GET_ORG_FOLLOWERS:'GET_ORG_FOLLOWERS_ERROR',
		GET_ORG_CUSTOMERS:'GET_ORG_CUSTOMERS_ERROR',
		GET_ORG_CERTIFICATES:'GET_ORG_CERTIFICATES_ERROR',
		//get products
		GET_PRODUCTS: 'GET_PRODUCTS_ERROR',
		//socials
		// GET_ORG_FOLLOWERS:'GET_ORG_FOLLOWERS_ERROR',
		GET_ORG_FOLLOWINGS:'GET_ORG_FOLLOWINGS_ERROR',
		GET_ORG_EXCHANGES: 'GET_ORG_EXCHANGES_ERROR',
		GET_ORG_FOLLOWINGS_IDENTITIES:'GET_ORG_FOLLOWINGS_IDENTITIES_ERROR',

		//certificate
		UPDATE_CERTIFICATE:'UPDATE_CERTIFICATE_ERROR',
		CREATE_CERTIFICATE:'CREATE_CERTIFICATE_ERROR',
		DELETE_CERTIFICATE:'DELETE_CERTIFICATE_ERROR',

		//customer
		UPDATE_CUSTOMER:'UPDATE_CUSTOMER_ERROR',
		CREATE_CUSTOMER:'CREATE_CUSTOMER_ERROR',
		DELETE_CUSTOMER:'DELETE_CUSTOMER_ERROR',
	},

	SUCCESS : {
		//ORGANIZATION - 
		GET_ORGANIZATION: 'GET_ORGANIZATION_SUCCESS',
		GET_META_DATA_ORGANIZATION:'GET_META_DATA_ORGANIZATION_SUCCESS',
		// GET_ORGANIZATION:'GET_ORGANIZATION_SUCCESS',
		GET_ORGANIZATION_MEMBERS:'GET_ORGANIZATION_MEMBERS_SUCCESS',
		GET_USER_IDENTITY:'GET_ORG_IDENTITY_SUCCESS',
		GET_ORG_FOLLOWERS:'GET_ORG_FOLLOWERS_SUCCESS',
		GET_ORG_FOLLOWINGS_IDENTITIES:'GET_ORG_FOLLOWINGS_IDENTITIES_SUCCESS',
		
		//organization - abilities
		GET_ABILITIES: 'GET_ABILITIES_SUCCESS',
		DELETE_ABILITY: 'DELETE_ABILITY_SUCCESS',
		UPDATE_ABILITY:'UPDATE_ABILITY_SUCCESS',
		CREATE_ABILITY: 'CREATE_ABILITY_SUCCESS',
		//organization - basic information
		UPDATE_ORGANIZATION_INFO: 'UPDATE_ORGANIZATION_INFO_SUCCESS',
		//get products
		GET_PRODUCTS: 'GET_PRODUCTS_SUCCESS',
		//socials
		GET_ORG_FOLLOWERS: 'GET_ORG_FOLLOWERS_SUCCESS',
		GET_ORG_FOLLOWINGS: 'GET_ORG_FOLLOWINGS_SUCCESS',
		GET_ORG_EXCHANGES: 'GET_ORG_EXCHANGES_SUCCESS',
		//organization - certificate 
		GET_ORG_CERTIFICATES: 'GET_ORG_CERTIFICATES_SUCCESS',
		DELETE_CERTIFICATE:'DELETE_CERTIFICATE_SUCCESS',
		UPDATE_CERTIFICATE:'UPDATE_CERTIFICATE_SUCCESS',
		CREATE_CERTIFICATE:'CREATE_CERTIFICATE_SUCCESS',
		//ORGANIZATION - CUSTOMER
		GET_ORG_CUSTOMERS:'GET_ORG_CUSTOMERS_SUCCESS',
		DELETE_CUSTOMER:'DELETE_CUSTOMER_SUCCESS',
		UPDATE_CUSTOMER:'UPDATE_CUSTOMER_SUCCESS',
		CREATE_CUSTOMER:'CREATE_CUSTOMER_SUCCESS',
		//ORGANIZATION - PRODUCTS
		UPDATE_PRODUCT: 'UPDATE_PRODUCT_SUCCESS',
		CREATE_PRODUCT : 'CREATE_PRODUCT_SUCCESS',
		DELETE_PRODUCT : 'DELETE_PRODUCT_SUCCESS',
		DELETE_PICTURE: 'DELETE_PICTURE_SUCCESS',
		ADD_PICTURE : 'ADD_PICTURE_SUCCESS',

		ADD_CONTRIBUTION: 'ADD_CONTRIBUTION_SUCCESS'
	},
	//ORGANIZATION - 
	GET_ORGANIZATION: 'GET_ORGANIZATION',
	GET_META_DATA_ORGANIZATION: 'GET_META_DATA_ORGANIZATION', 
	GET_ORGANIZATION_MEMBERS : 'GET_ORGANIZATION_MEMBERS',
	GET_USER_IDENTITY:'GET_USER_IDENTITY',
	
	//socials
	GET_ORG_FOLLOWERS:'GET_ORG_FOLLOWERS',
	GET_ORG_FOLLOWINGS:'GET_ORG_FOLLOWINGS',
	GET_ORG_EXCHANGES: 'GET_ORG_EXCHANGES',
	GET_ORG_FOLLOWINGS_IDENTITIES:'GET_ORG_FOLLOWINGS_IDENTITIES',
	//organization - abilities
	GET_ABILITIES: 'GET_ABILITIES',
	UPDATE_ABILITY: 'UPDATE_ABILITY',
	CREATE_ABILITY: 'CREATE_ABILITY',
	DELETE_ABILITY: 'DELETE_ABILITY',
	UPDATE_ABILITY_FAILED: 'UPDATE_ABILITY_FAILED',
	CREATE_ABILITY_FAILED: 'CREATE_ABILITY_FAILED',
	DELETE_ABILITY_FAILED: 'DELETE_ABILITY_FAILED',
	//organization - basic information
	UPDATE_ORGANIZATION_INFO: 'UPDATE_ORGANIZATION_INFO',
	//products
	GET_PRODUCTS: 'GET_PRODUCTS',
	//organization - certificate 
	GET_ORG_CERTIFICATES:'GET_ORG_CERTIFICATES',
	UPDATE_CERTIFICATE:'UPDATE_CERTIFICATE',
	CREATE_CERTIFICATE:'CREATE_CERTIFICATE',
	DELETE_CERTIFICATE:'DELETE_CERTIFICATE',
	//ORGANIZATION - CUSTOMER
	GET_ORG_CUSTOMERS:'GET_ORG_CUSTOMERS',
	UPDATE_CUSTOMER:'UPDATE_CUSTOMER',
	CREATE_CUSTOMER:'CREATE_CUSTOMER',
	DELETE_CUSTOMER:'DELETE_CUSTOMER',
	//ORGANIZATION - PRODUCTS
	UPDATE_PRODUCT: 'UPDATE_PRODUCT',
	CREATE_PRODUCT : 'CREATE_PRODUCT',
	DELETE_PRODUCT : 'DELETE_PRODUCT',
	ADD_PICTURE : 'ADD_PICTURE',
	DELETE_PICTURE: 'DELETE_PICTURE',
	ADD_PICTURE_SUCCESS : 'ADD_PICTURE_SUCCESS',
	UPDATE_PRODUCT_FAILED: 	'UPDATE_PRODUCT_FAILED',
	CREATE_PRODUCT_FAILED : 'CREATE_PRODUCT_FAILED',
	DELETE_PRODUCT_FAILED : 'DELETE_PRODUCT_FAILED',

	// ADD CONTRIBUTION
	ADD_CONTRIBUTION: 'ADD_CONTRIBUTION',

	// COMMON
	ADD_TAG_ON: 'ADD_TAG_ON',
	ADD_FILE_FOR: 'ADD_FILE_FOR',
	ADD_PRICE_FOR: 'ADD_PRICE_FOR',
}
export default types