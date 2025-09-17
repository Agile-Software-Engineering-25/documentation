---
sidebar_position: 4
title: Add new subdomain to cluster
---

```yaml title="<domain>-certificate.yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: <domain>-sau-portal.de
  namespace: kube-system
spec:
  secretName: <domain>-sni-tls
  commonName: <domain>.sau-portal.de
  dnsNames:
    - <domain>.sau-portal.de
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
```

```yaml title="<domain>-shim-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: <domain>-sni-shim
  namespace: kube-system
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
spec:
  ingressClassName: traefik
  tls:
    - hosts:
        - <domain>.sau-portal.de
      secretName: <domain>-sni-tls
  rules:
    - host: <domain>.sau-portal.de
      http:
        paths:
          - path: /__tls-shim
            pathType: Prefix
            backend:
              service:
                name: traefik
                port:
                  number: 80
```
