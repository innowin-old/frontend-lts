import {all} from 'redux-saga/effects'
import {watchGetOrganization,
	watchGetOrganizationSuccess,
	watchGetOrganizationMembers,
	//watchGetOrganizationMembersSuccess,
	watchUpdateOrganization,
	watchGetProducts,
	watchGetOrgFollowers,
	watchGetOrgFollowings,
	watchGetOrgExchanges,
	watchGetCustomers,
	watchGetCertificates,
	watchUpdateCustomer,
	watchCreateOrgProduct,
	} from './organization/organizationSaga'
import {watchLSignIn, watchLSignOut, watchLSignInError} from './auth/authSaga'
import {watchCreateSkill, watchCreateProduct} from './addingContribution/addContributionSagas'
import {watchGetProductInfo} from './common/commonSagas'
import {watchLGetExchangesByMemberIdentity , watchGetExchangeByExId , watchGetExchangeMembersByExId ,watchDeleteExchangeMembership} from "./exchange/exchange"
import {watchFilterPostsByPostParentPostTypeLimitOffset} from "./common/post/post"

const rootSaga = function* () {
	yield all([
		watchLSignInError(),
		watchLSignOut(),
		watchLSignIn(),
		watchGetCertificates(),
		watchGetCustomers(),
		watchGetOrganization(),
		watchGetOrganizationMembers(),
		watchGetOrganizationSuccess(),
		watchGetOrgExchanges(),
		watchGetOrgFollowers(),
		watchGetOrgFollowings(),
		watchGetProducts(),
		watchUpdateOrganization(),
    //Exchange sagas
		watchGetExchangeByExId(),
    watchLGetExchangesByMemberIdentity(),
		watchGetExchangeMembersByExId(),
		watchDeleteExchangeMembership(),
		watchUpdateCustomer(),
		watchCreateSkill(),
		// watchCreateProduct(),
		watchCreateOrgProduct(),
		//post
		watchFilterPostsByPostParentPostTypeLimitOffset(),
		// common sagas
        watchGetProductInfo(),
    ])
}

export default rootSaga;