import { useUser } from 'apps/vtex/hooks/useUser.ts'
import Icon from 'site/components/ui/Icon.tsx'
import Image from 'apps/website/components/Image.tsx'
import { useId } from 'site/sdk/useId.ts'
import { SendEventOnClick } from 'site/components/Analytics.tsx'

const MyAccount = () => {
	const { user } = useUser()

	

	return (
		<>
			<a id={"link-login"} href='/account' class='flex items-center gap-2'>
				<Icon id='Login' size={24} />
        
				{user.value?.email
					? (
						<p class='text-xs max-w-24 text-ellipsis text-left overflow-hidden hidden lg:block'>
							Olá,<br />
							{user.value?.givenName ? <b>{user.value?.givenName}</b> : <b>{user.value?.email}</b>}
						</p>
					)
					: (
						<p class='text-xs hidden min-[1280px]:block text-left'>
							Faça seu <b>login</b>
							<br />
							ou <b>cadastre-se</b>
						</p>
					)}
			</a>

			
		</>
	)
}

export default MyAccount
