import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\PasswordResetController::create
 * @see app/Http/Controllers/Auth/PasswordResetController.php:19
 * @route '/forgot-password'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/forgot-password',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetController::create
 * @see app/Http/Controllers/Auth/PasswordResetController.php:19
 * @route '/forgot-password'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetController::create
 * @see app/Http/Controllers/Auth/PasswordResetController.php:19
 * @route '/forgot-password'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\PasswordResetController::create
 * @see app/Http/Controllers/Auth/PasswordResetController.php:19
 * @route '/forgot-password'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\PasswordResetController::create
 * @see app/Http/Controllers/Auth/PasswordResetController.php:19
 * @route '/forgot-password'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\PasswordResetController::create
 * @see app/Http/Controllers/Auth/PasswordResetController.php:19
 * @route '/forgot-password'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\PasswordResetController::create
 * @see app/Http/Controllers/Auth/PasswordResetController.php:19
 * @route '/forgot-password'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Auth\PasswordResetController::sendOtp
 * @see app/Http/Controllers/Auth/PasswordResetController.php:33
 * @route '/forgot-password'
 */
export const sendOtp = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendOtp.url(options),
    method: 'post',
})

sendOtp.definition = {
    methods: ["post"],
    url: '/forgot-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetController::sendOtp
 * @see app/Http/Controllers/Auth/PasswordResetController.php:33
 * @route '/forgot-password'
 */
sendOtp.url = (options?: RouteQueryOptions) => {
    return sendOtp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetController::sendOtp
 * @see app/Http/Controllers/Auth/PasswordResetController.php:33
 * @route '/forgot-password'
 */
sendOtp.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendOtp.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\PasswordResetController::sendOtp
 * @see app/Http/Controllers/Auth/PasswordResetController.php:33
 * @route '/forgot-password'
 */
    const sendOtpForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sendOtp.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\PasswordResetController::sendOtp
 * @see app/Http/Controllers/Auth/PasswordResetController.php:33
 * @route '/forgot-password'
 */
        sendOtpForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sendOtp.url(options),
            method: 'post',
        })
    
    sendOtp.form = sendOtpForm
/**
* @see \App\Http\Controllers\Auth\PasswordResetController::show
 * @see app/Http/Controllers/Auth/PasswordResetController.php:28
 * @route '/reset-password/{token?}'
 */
export const show = (args?: { token?: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/reset-password/{token?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetController::show
 * @see app/Http/Controllers/Auth/PasswordResetController.php:28
 * @route '/reset-password/{token?}'
 */
show.url = (args?: { token?: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "token",
        ])

    const parsedArgs = {
                        token: args?.token,
                }

    return show.definition.url
            .replace('{token?}', parsedArgs.token?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetController::show
 * @see app/Http/Controllers/Auth/PasswordResetController.php:28
 * @route '/reset-password/{token?}'
 */
show.get = (args?: { token?: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\PasswordResetController::show
 * @see app/Http/Controllers/Auth/PasswordResetController.php:28
 * @route '/reset-password/{token?}'
 */
show.head = (args?: { token?: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\PasswordResetController::show
 * @see app/Http/Controllers/Auth/PasswordResetController.php:28
 * @route '/reset-password/{token?}'
 */
    const showForm = (args?: { token?: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\PasswordResetController::show
 * @see app/Http/Controllers/Auth/PasswordResetController.php:28
 * @route '/reset-password/{token?}'
 */
        showForm.get = (args?: { token?: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\PasswordResetController::show
 * @see app/Http/Controllers/Auth/PasswordResetController.php:28
 * @route '/reset-password/{token?}'
 */
        showForm.head = (args?: { token?: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Auth\PasswordResetController::reset
 * @see app/Http/Controllers/Auth/PasswordResetController.php:72
 * @route '/reset-password'
 */
export const reset = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(options),
    method: 'post',
})

reset.definition = {
    methods: ["post"],
    url: '/reset-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetController::reset
 * @see app/Http/Controllers/Auth/PasswordResetController.php:72
 * @route '/reset-password'
 */
reset.url = (options?: RouteQueryOptions) => {
    return reset.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetController::reset
 * @see app/Http/Controllers/Auth/PasswordResetController.php:72
 * @route '/reset-password'
 */
reset.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\PasswordResetController::reset
 * @see app/Http/Controllers/Auth/PasswordResetController.php:72
 * @route '/reset-password'
 */
    const resetForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reset.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\PasswordResetController::reset
 * @see app/Http/Controllers/Auth/PasswordResetController.php:72
 * @route '/reset-password'
 */
        resetForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reset.url(options),
            method: 'post',
        })
    
    reset.form = resetForm
const PasswordResetController = { create, sendOtp, show, reset }

export default PasswordResetController