ldap server:

host port: 389, 636⁠
docker port: 389, 636⁠

url: https://localhost:16443

host port: 16443, 8081

docker port: 443, 80

login:

username: cn=admin,dc=saqal,dc=org

password: admin

things need to be learned:
- what is AD, why do we have it?
- design AD hierarchy

things need to be done:
- create a new org unit [ex: users]
- create a new unix group (posix)
- create a new account & include all required details (ex: eamil)

url_connection      = ldap://ldap.saqal:389
bind_dn             = cn=admin,dc=saqal,dc=org
bind_credentials    = admin