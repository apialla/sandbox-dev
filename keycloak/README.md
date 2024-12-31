keyclock dose not follow compose pattern as it currently dose not work, so, we are using `docker run` as alterntaive.

url: http://localhost:8080

host port: 8080

docker port: 8080

userdn: cn=allusers,dc=saqal,dc=org
Username LDAP attribute : uid
RDN LDAP attribute: cn
UUID LDAP attribute: entryUUID
User object classes: inetOrgPerson, posixAccount, top