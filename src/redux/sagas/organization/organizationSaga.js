import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, takeEvery, call, all} from 'redux-saga/effects'
import api from 'src/consts/api'
import results from 'src/consts/resultName'
import { addPicture } from '../../../crud/organization/products';

function* createSimpleChannel(result, url, type, query = '') {
	const socketChannel = yield call(api.createSocketChannel, result)
	let data
	try {
		yield fork(api.get, url, result, query)
		data = yield take(socketChannel)
	} catch (e) {
		const {message} = e
		yield put({type: types.ERRORS[type], payload: {type: types.ERRORS[type], message}})
	} finally {
		socketChannel.close()
		return data
	}
}

/**********    %% WORKERS %%    **********/

//1 - get org worker
export function* getOrganization(action) {
  const payload = action.payload
  const {organizationId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORGANIZATION)
  try {
    yield fork(api.get, urls.ORG.GET_ORGANIZATION, results.ORG.GET_ORGANIZATION, organizationId)
    // while (true) {
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_ORGANIZATION, payload: data})
    // }
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.GET_ORGANIZATION, payload: {type: types.ERRORS.ORG.GET_ORGANIZATION, message}})
  } finally {
    socketChannel.close()
  }
}

//2 - get org success
function getOrganizationSuccess(action) {
	const {organizationId} = action.payload
}

//3 - get organization members
function* getOrganizationMembers(action) {
	const payload = action.payload
	const {organizationId} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORGANIZATION_MEMBERS)
	try {
		yield fork(api.get, urls.ORG.GET_ORGANIZATION_MEMBERS, results.ORG.GET_ORGANIZATION_MEMBERS, `?staff_organization=${organizationId}`)
		while (true) {
			const data = yield take(socketChannel)
			yield put({type: types.SUCCESS.ORG.GET_ORGANIZATION_MEMBERS, payload: data})
		}
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.GET_ORGANIZATION_MEMBERS,
			payload: {type: types.ERRORS.ORG.GET_ORGANIZATION_MEMBERS, message}
		})
	} finally {
		socketChannel.close()
	}
}

//5 - update - organization
function* updateOrganization(action) {
	const payload = action.payload
	const {organizationId, formValues, hideEdit} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.ORG.UPDATE_ORGANIZATION_INFO)
	try {
		yield fork(api.patch, urls.ORG.UPDATE_ORGANIZATION_INFO, results.ORG.UPDATE_ORGANIZATION_INFO, formValues, `${organizationId}/`)
		const data = yield take(socketChannel)
		yield put({type: types.SUCCESS.ORG.UPDATE_ORGANIZATION_INFO, payload: data})
		
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.UPDATE_ORGANIZATION_INFO,
			payload: {type: types.ERRORS.ORG.UPDATE_ORGANIZATION_INFO, message}
		})
	} finally {
		socketChannel.close()
		hideEdit()
	}
}

//6 - get - products
function* getProducts(action) {
  const payload = action.payload
  const {organizationId} = payload;
	const identity = yield* getOrgIdentity(action)
	const categories = yield* getProductCategories()
	
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_PRODUCTS)
  try {
    yield fork(api.get, urls.ORG.GET_PRODUCTS, results.ORG.GET_PRODUCTS, `?product_owner=${identity[0].id}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_PRODUCTS, payload: {products:data,categories}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.GET_PRODUCTS, payload: {type: types.ERRORS.ORG.GET_PRODUCTS, message}})
  } finally {
    socketChannel.close()
  }
}

// 7 - get - followers
function* getFollowers(action) {
	const payload = action.payload
	const {organizationId} = payload;
	const identity = yield* getOrgIdentity(action)
	let followers = yield* getFollowersIdentities(identity[0].id)
	followers = followers.map((val, idx) => {
		return getFollower(val.follow_follower)
	})
	const results = yield* all(followers)
}

// 8 - get - followings
function* getFollowings(action) {
	const payload = action.payload
	const {organizationId} = payload;
	const identity = yield* getOrgIdentity(action)
	const followings = yield* getFollowingsIdentities(identity[0].id)
	followings.map((val, idx) => {
		return getFollowing(val.follow_followed)
	})
	const results = yield* all(followings)
}

// 9 - get - exchanges
function* getExchanges(action) {
	const payload = action.payload
	const {organizationId} = payload;
	const identity = yield getOrgIdentity(action)
	const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORG_EXCHANGES)
	try {
		yield fork(api.get, urls.ORG.GET_ORG_EXCHANGES, results.ORG.GET_ORG_EXCHANGES, `?identity_id=${identity[0].id}`)
		const data = yield take(socketChannel)
		yield put({type: types.SUCCESS.ORG.GET_ORG_EXCHANGES, payload: data})
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.GET_ORG_EXCHANGES,
			payload: {type: types.ERRORS.ORG.GET_ORG_EXCHANGES, message}
		})
	} finally {
		socketChannel.close()
	}
}

//10 get - org - identity
function* getOrgIdentity(action) {
	const payload = action.payload
	const {organizationId} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_USER_IDENTITY)
	let res
	try {
		yield fork(api.get, urls.ORG.GET_USER_IDENTITY, results.ORG.GET_USER_IDENTITY, `?identity_organization=${organizationId}`)
		const data = yield take(socketChannel)
		res = data
		yield put({type: types.SUCCESS.ORG.GET_USER_IDENTITY, payload: data})
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.GET_USER_IDENTITY,
			payload: {type: types.ERRORS.ORG.GET_USER_IDENTITY, message}
		})
	} finally {
		socketChannel.close()
		return res
	}
}

//11 get - org- followings identities
function* getFollowingsIdentities(orgIdentity) {
	let data
	const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORG_FOLLOWINGS_IDENTITIES)
	try {
		yield fork(api.get, urls.ORG.GET_ORG_FOLLOWERS, results.ORG.GET_ORG_FOLLOWINGS_IDENTITIES, `?follow_follower=${orgIdentity}`)
		data = yield take(socketChannel)
		yield put({type: types.SUCCESS.ORG.GET_ORG_FOLLOWINGS_IDENTITIES, payload: data})
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.GET_ORG_FOLLOWINGS_IDENTITIES,
			payload: {type: types.ERRORS.ORG.GET_ORG_FOLLOWINGS_IDENTITIES, message}
		})
	} finally {
		socketChannel.close()
		return data
	}
}

//12 get following
function* getFollowing(follow_followed) {
	const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORG_FOLLOWING)
	try {
		yield fork(api.get, urls.ORG.GET_USER_IDENTITY, results.ORG.GET_ORG_FOLLOWING, `${follow_followed}`)
		const data = yield take(socketChannel)
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.GET_ORG_FOLLOWING,
			payload: {type: types.ERRORS.ORG.GET_ORG_FOLLOWING, message}
		})
	} finally {
		socketChannel.close()
	}
}

//13 get - org - followers identities
function* getFollowersIdentities(orgIdentity) {
	return yield createSimpleChannel('get-followers-identities', 'organizations/follows', types.GET_ORG_FOLLOWERS, `?follow_followed=${orgIdentity}`)
}

//14 get - org - follower
function* getFollower(follow_follower) {
	const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORG_FOLLOWERS)
	try {
		yield fork(api.get, urls.ORG.GET_USER_IDENTITY, results.ORG.GET_ORG_FOLLOWERS, `${follow_follower}`)
		const data = yield take(socketChannel)
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.GET_ORG_FOLLOWING,
			payload: {type: types.ERRORS.ORG.GET_ORG_FOLLOWING, message}
		})
	} finally {
		socketChannel.close()
	}
}

//13 get org customer
function* getCustomers(action) { //TODO amir
	const payload = action.payload;
	const {organizationId} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORG_CUSTOMERS)
	try {
		yield fork(api.get, urls.ORG.GET_ORG_CUSTOMERS, results.ORG.GET_ORG_CUSTOMERS, `?customer_organization=${organizationId}`)
		const data = yield take(socketChannel)
		yield put({type: types.SUCCESS.ORG.GET_ORG_CUSTOMERS, payload: data})
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.GET_ORG_CUSTOMERS,
			payload: {type: types.ERRORS.ORG.GET_ORG_CUSTOMERS, message}
		})
	} finally {
		socketChannel.close()
	}
}

//14 get org certificates
function* getCertificates(action) { //TODO amir change URL nad QUERY
	const payload = action.payload;
	const {identityId} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORG_CERTIFICATES)
	try {
		yield fork(api.get, urls.ORG.GET_ORG_CERTIFICATES, results.ORG.GET_ORG_CERTIFICATES, `?certificate_identity=${identityId}`)
		const data = yield take(socketChannel)
		if(typeof data =="string"){
			yield put({
				type: types.ERRORS.ORG.GET_ORG_CERTIFICATES,
				payload: {type: types.ERRORS.ORG.GET_ORG_CERTIFICATES, error: "Request Failed"}
			})
		}else{
			yield put({type: types.SUCCESS.ORG.GET_ORG_CERTIFICATES, payload: data})
		}
		
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.GET_ORG_CERTIFICATES,
			payload: {type: types.ERRORS.ORG.GET_ORG_CERTIFICATES, error: message}
		})
	} finally {
		socketChannel.close()
	}
}

//15 update certificate
function* updateCertificate(action) { //TODO amir change URL nad QUERY
	const payload = action.payload;
	const {formValues, certId, hideEdit} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.ORG.UPDATE_CERTIFICATE)
	try {
		yield fork(api.patch, urls.UPDATE_CERTIFICATE, results.UPDATE_CERTIFICATE, formValues, `/${certId}`)
		const data = yield take(socketChannel)
		yield put({type: types.SUCCESS.ORG.UPDATE_CERTIFICATE, payload: data})
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.UPDATE_CERTIFICATE,
			payload: {type: types.ERRORS.ORG.UPDATE_CERTIFICATE, error: message}
		})
	} finally {
		socketChannel.close()
		hideEdit()
	}
}

// 16 update customer
function* updateCustomer(action) { //TODO amir change URL nad QUERY
	const payload = action.payload;
	const {formValues, customerId, hideEdit} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.ORG.UPDATE_CUSTOMER)
	try {
		yield fork(api.patch, urls.UPDATE_CUSTOMER, results.UPDATE_CUSTOMER, formValues, `${customerId}`)
		const data = yield take(socketChannel)
		yield put({type: types.SUCCESS.UPDATE_CUSTOMER, payload: data})
	} catch (e) {
		const {message} = e
		yield put({type: types.ERRORS.UPDATE_CUSTOMER, payload: {type: types.ERRORS.UPDATE_CUSTOMER, error: message}})
	} finally {
		socketChannel.close()
		hideEdit()
	}
}

{/*<<<<<<< Updated upstream*/}
//17 create org products
function* createProduct(action){
  const payload = action.payload;
  const {formValues, identityId, hideEdit} = payload;
  // const identity = yield* getOrgIdentity(action)
  formValues.product_owner = identityId
  const socketChannel = yield call(api.createSocketChannel, results.ORG.CREATE_PRODUCT)
  try {
    yield fork(api.post, urls.ORG.CREATE_PRODUCT, results.ORG.CREATE_PRODUCT, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.CREATE_PRODUCT, payload: data})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.CREATE_PRODUCT, payload: {type: types.ERRORS.ORG.CREATE_PRODUCT, error: message}})
  } finally {
    socketChannel.close()
    hideEdit()
  }
}

//18 get products categories
function* getProductCategories() {
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_PRODUCT_CATEGORIES)
  let res
  try {
    yield fork(api.get, urls.ORG.GET_PRODUCT_CATEGORIES, results.ORG.GET_PRODUCT_CATEGORIES)
    const data = yield take(socketChannel)
    res = data
    yield put({type: types.SUCCESS.ORG.GET_PRODUCT_CATEGORIES, payload: data})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.GET_PRODUCT_CATEGORIES, payload: {type: types.ERRORS.ORG.GET_PRODUCT_CATEGORIES, message}})
  } finally {
    socketChannel.close()
    return res
  }
}

//19 update org products
function* updateProduct(action){
	const payload = action.payload;
	const {formValues, productId, hideEdit} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.ORG.UPDATE_PRODUCT)
	try {
		yield fork(api.patch, urls.ORG.UPDATE_PRODUCT, results.ORG.UPDATE_PRODUCT, formValues, `${productId}`)
		const data = yield take(socketChannel)
		yield put({type: types.SUCCESS.ORG.UPDATE_PRODUCT, payload: data})
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.UPDATE_PRODUCT,
			payload: {type: types.ERRORS.ORG.UPDATE_PRODUCT, error: message}
		})
	} finally {
		socketChannel.close()
		hideEdit()
	}
}
//20 get product picture org
function* getProductPicture(productId){

	const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_PRODUCT_PICTURE)
	let res
	try {
		yield fork(api.get, urls.ORG.GET_PRODUCT_PICTURE, results.ORG.GET_PRODUCT_PICTURE, `?picture_product=${productId}`)
		const data = yield take(socketChannel)
		res = data
		yield put({type: types.SUCCESS.ORG.GET_PRODUCT_PICTURE, payload: data})
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.GET_PRODUCT_PICTURE,
			payload: {type: types.ERRORS.ORG.GET_PRODUCT_PICTURE, error: message}
		})
	} finally {
		socketChannel.close()
		return res
	}
}
//21 add picture product org
function* addPictureProduct(action){
	const payload = action.payload;
	const {formValues, productId, hideEdit} = payload;
	formValues.picture_product = productId;
	const socketChannel = yield call(api.createSocketChannel, results.ORG.ADD_PRODUCT_PICTURE)
	try {
		yield fork(api.post, urls.ORG.ADD_PRODUCT_PICTURE, results.ORG.ADD_PRODUCT_PICTURE, formValues)
		const data = yield take(socketChannel)
		yield put({type: types.SUCCESS.ORG.ADD_PRODUCT_PICTURE, payload: data})
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.ADD_PRODUCT_PICTURE,
			payload: {type: types.ERRORS.ORG.ADD_PRODUCT_PICTURE, error: message}
		})
	} finally {
		socketChannel.close()
		hideEdit()
	}
}

function* getProductsSuccess(action){
	const{products} = action.payload;
	for (let i = 0 ; i < products.length;i++){
		yield getProductPicture(products[i].id)
		yield getProductPrice(products[i].id)
	}
}

function* getProductPrice(productId){
	const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_PRODUCT_PRICE)
	let res
	try {
		yield fork(api.get, urls.ORG.GET_PRODUCT_PRICE, results.ORG.GET_PRODUCT_PRICE, `?price_product=${productId}`)
		const data = yield take(socketChannel)
		res = data
		yield put({type: types.SUCCESS.ORG.GET_PRODUCT_PRICE, payload: data})
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.GET_PRODUCT_PRICE,
			payload: {type: types.ERRORS.ORG.GET_PRODUCT_PRICE, error: message}
		})
	} finally {
		socketChannel.close()
		return res
	}
}

function* deleteProduct(action){
	const {productId} = action.payload
	const socketChannel = yield call(api.createSocketChannel, results.ORG.DELETE_PRODUCT)
	try {
		yield fork(api.del, urls.ORG.DELETE_PRODUCT,  results.ORG.DELETE_PRODUCT,{},`${productId}`)
		const data = yield take(socketChannel)
		yield put({type: types.SUCCESS.ORG.DELETE_PRODUCT, payload: {productId}})
	} catch (e) {
		const {message} = e
		yield put({
			type: types.ERRORS.ORG.DELETE_PRODUCT,
			payload: {type: types.ERRORS.ORG.DELETE_PRODUCT, error: message}
		})
	} finally {
		socketChannel.close()
	}
}

function* createCertificate(action){
  const payload = action.payload;
  const {formValues, identityId, userId,  hideEdit} = payload;
  // const identity = yield* getOrgIdentity(action)
	formValues.certificate_identity = identityId
	formValues.certificate_parent = userId
  const socketChannel = yield call(api.createSocketChannel, results.ORG.CREATE_CERTIFICATE)
  try {
    yield fork(api.post, urls.ORG.CREATE_CERTIFICATE, results.ORG.CREATE_CERTIFICATE, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.CREATE_CERTIFICATE, payload: data})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.CREATE_CERTIFICATE, payload: {type: types.ERRORS.ORG.CREATE_CERTIFICATE, error: message}})
  } finally {
    socketChannel.close()
    hideEdit()
  }
}
/**********    %% WATCHERS %%    **********/
//1 - get organization
export function* watchGetOrganization() {
  yield takeEvery(types.ORG.GET_ORGANIZATION, getOrganization)
}

//2 - get organization - success
export function* watchGetOrganizationSuccess() {
	yield takeEvery(types.SUCCESS.ORG.GET_ORGANIZATION, getOrganizationSuccess)
}

//3 - get organization - members
export function* watchGetOrganizationMembers() {
  yield takeEvery(types.ORG.GET_ORGANIZATION_MEMBERS, getOrganizationMembers)
}

//5 - update organization 
export function* watchUpdateOrganization() {
  yield takeEvery(types.ORG.UPDATE_ORGANIZATION_INFO, updateOrganization)
}

//6- get products
export function* watchGetProducts() {
  yield takeEvery(types.ORG.GET_PRODUCTS, getProducts)
}

//7- get org identity
export function* watchGetOrgIdentity() {
  yield takeEvery(types.ORG.GET_USER_IDENTITY, getOrgIdentity)
}

// 8 - get org followers
export function* watchGetOrgFollowers() {
  yield takeEvery(types.ORG.GET_ORG_FOLLOWERS, getFollowers)
}

// 9 get org followings
export function* watchGetOrgFollowings() {
  yield takeEvery(types.ORG.GET_ORG_FOLLOWINGS, getFollowings)
}

// 10 - get org exchanges
export function* watchGetOrgExchanges() {
  yield takeEvery(types.ORG.GET_ORG_EXCHANGES, getExchanges)
}

//11 - get org customers
export function* watchGetCustomers() {
  yield takeEvery(types.ORG.GET_ORG_CUSTOMERS, getCustomers)
}

//12 - get org certificates
export function* watchGetCertificates() {
  yield takeEvery(types.ORG.GET_ORG_CERTIFICATES, getCertificates)
}

export function* watchCreateCertificate() {
  yield takeEvery(types.ORG.CREATE_CERTIFICATE, createCertificate)
}

//13 - update org certificate
export function* watchUpdateCertificate() {
  yield takeEvery(types.ORG.UPDATE_CERTIFICATE, updateCertificate)
}

//14 - update org customer
export function* watchUpdateCustomer() {
  yield takeEvery(types.ORG.UPDATE_CUSTOMER, updateCustomer)
}

export function* watchCreateOrgProduct() {
  yield takeEvery(types.ORG.CREATE_PRODUCT, createProduct)
}

export function* watchUpdateOrgProduct() {
	yield takeEvery(types.ORG.UPDATE_PRODUCT, updateProduct)
}

export function* watchAddProductPicture() {
	yield takeEvery(types.ORG.ADD_PRODUCT_PICTURE, addPictureProduct)
}

export function* watchGetProductPictures(){
	yield takeEvery(types.ORG.GET_PRODUCT_PICTURE, getProductPicture)
}

// get products success
export function* watchGetProductsSuccess() {
  yield takeEvery(types.SUCCESS.ORG.GET_PRODUCTS, getProductsSuccess)
}

export function* watchDeleteProduct(){
	yield takeEvery(types.ORG.DELETE_PRODUCT, deleteProduct)
}

