import { authClient } from '~/web/lib/auth'

const changePasswordReq = authClient.changePassword

type ChangePasswordReq = Pick<
  Parameters<typeof changePasswordReq>[0],
  'newPassword' | 'currentPassword' | 'revokeOtherSessions'
>

export const changePassword = async (data: ChangePasswordReq) =>
  await changePasswordReq(data)

const updateProfileReq = authClient.updateUser

type UpdateProfileReq = Pick<
  Exclude<Parameters<typeof updateProfileReq>[0], undefined>,
  'name'
>

export const updateProfile = async (data: UpdateProfileReq) =>
  await updateProfileReq(data)

export const deleteProfile = async () => await authClient.deleteUser()
