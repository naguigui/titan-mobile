import React, { useEffect } from 'react'
import { Query } from 'react-apollo'
import { Text, View } from 'react-native'
import { isEmpty } from 'lodash'

import Layout from '../../components/layout'
import AuthService from '../../services/authService'

import { GET_USER } from '../../graphql/queries/userQueries'
import { usePrevious } from '../../hooks'

const AccountSettingsContainer = (props) => {
	const { navigation, queryData } = props
	const prevQueryData = usePrevious(queryData)

	useEffect(() => {
		if (isEmpty(prevQueryData) && !isEmpty(queryData)) {
			navigation.setParams({ title: queryData.user.name })
		}
	}, [queryData])

	return (
		<Layout>
			<View>
				<Text>Account Settings</Text>
				<Text onPress={async () => await AuthService.deauthenticate()}>
					Logout
				</Text>
			</View>
		</Layout>
	)
}

const AccountSettingsContainerWithQuery = (props) => {
	return (
		<Query query={GET_USER}>
			{({ loading, data }) => {
				return (
					<AccountSettingsContainer
						queryData={data}
						isLoading={loading}
						{...props}
					/>
				)
			}}
		</Query>
	)
}

export default AccountSettingsContainerWithQuery
