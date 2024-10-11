package com.example.stockolm.global.auth;

import com.example.stockolm.global.util.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;


@Component
@RequiredArgsConstructor
public class UserArgumentResolver implements HandlerMethodArgumentResolver {

    private final JwtUtil jwtUtil;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {

        boolean hasAuthPrincipalAnnotation = parameter.hasParameterAnnotation(AuthPrincipal.class);
        boolean hasLongType = Long.class.isAssignableFrom(parameter.getParameterType());
        return hasAuthPrincipalAnnotation && hasLongType;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

        final String authorizationHeader = webRequest.getHeader(HttpHeaders.AUTHORIZATION);

        return jwtUtil.getUserId(authorizationHeader);
    }
}
