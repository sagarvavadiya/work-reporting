import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'

type Status = 'success' | 'failed'

const tempSigneInResponse = {
    "data": {
        "user": {
            "avatar": "/img/avatars/thumb-1.jpg",
            "userName": "Carolyn Perkins",
            "email": "carolyn.p@elstar.com",
            "authority": [
                "admin",
                "user"
            ]
        },
        "token": "wVYrxaeNa9OxdnULvde1Au5m5w63"
    },
    "status": 201,
    "statusText": "Created",
    "headers": {
        "content-type": "application/json"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 60000,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        "baseURL": "/api",
        "url": "/sign-in",
        "method": "post",
        "data": "{\"userName\":\"admin\",\"password\":\"123Qwe\"}"
    },
    "request": {
        "_eventListeners": {
            "loadend": [
                null
            ],
            "abort": [
                null
            ],
            "load": [
                null
            ],
            "progress": [
                null
            ],
            "loadstart": [
                null
            ]
        },
        "readyState": 4,
        "requestHeaders": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        "requestBody": "{\"userName\":\"admin\",\"password\":\"123Qwe\"}",
        "status": 201,
        "statusText": "Created",
        "upload": {
            "_eventListeners": {
                "loadend": [
                    null
                ],
                "abort": [
                    null
                ],
                "load": [
                    null
                ],
                "progress": [
                    null
                ],
                "loadstart": [
                    null
                ]
            }
        },
        "onload": null,
        "onloadstart": null,
        "onprogress": null,
        "onreadystatechange": null,
        "method": "POST",
        "url": "/api/sign-in",
        "async": true,
        "responseText": "{\"user\":{\"avatar\":\"/img/avatars/thumb-1.jpg\",\"userName\":\"Carolyn Perkins\",\"email\":\"carolyn.p@elstar.com\",\"authority\":[\"admin\",\"user\"]},\"token\":\"wVYrxaeNa9OxdnULvde1Au5m5w63\"}",
        "response": "{\"user\":{\"avatar\":\"/img/avatars/thumb-1.jpg\",\"userName\":\"Carolyn Perkins\",\"email\":\"carolyn.p@elstar.com\",\"authority\":[\"admin\",\"user\"]},\"token\":\"wVYrxaeNa9OxdnULvde1Au5m5w63\"}",
        "responseXML": null,
        "responseURL": "/api/sign-in",
        "sendFlag": true,
        "timeout": 60000,
        "sendArguments": {
            "0": "{\"userName\":\"admin\",\"password\":\"123Qwe\"}"
        },
        "errorFlag": false,
        "params": {},
        "queryParams": {},
        "responseHeaders": {
            "Content-Type": "application/json"
        }
    }
}
function useAuth() {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useAppSelector((state) => state.auth.session)

    const signIn = async (
        values: SignInCredential
    ): Promise<
        | {
              status: Status
              message: string
          }
        | undefined
    > => {
        try {
            const resp = tempSigneInResponse
            if (resp.data) {
                const { token } = resp.data
                dispatch(signInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values: SignUpCredential) => {
        try {
            const resp = await apiSignUp(values)
            if (resp.data) {
                const { token } = resp.data
                dispatch(signInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(
            setUser({
                avatar: '',
                userName: '',
                email: '',
                authority: [],
            })
        )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
