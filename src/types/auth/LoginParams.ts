export type PasswordLoginParams = {
    method?: 'password';
    email: string;
    password: string;
};

export type OtpLoginParams = {
    method?: 'otp';
    email: string;
};

export type OauthLoginParams = {
    method?: 'oauth';
    provider: 'google' | 'facebook' | 'apple';
};

export type LoginParams = PasswordLoginParams | OtpLoginParams | OauthLoginParams;
