const errorResponse = {
  idLosNotFound: {
    message: 'User ID tidak terdaftar',
    code: 400
  },
  invalidPassword: {
    message: 'Password yang anda masukkan salah',
    code: 400
  },
  IDNull: {
    message: 'Mohon masukkan User ID',
    code: 400
  },
  passwordNull: {
    message: 'Mohon masukkan password',
    code: 400
  },
  idLDAPNotFound: {
    message: 'User ID Ldap tidak terdaftar',
    code: 400
  },
  timeoutResponse: {
    message: 'Server Timeout. Silahkan hubungi administrator sistem. ',
    code: 504
  },
  ldapAccountLocked: {
    message: 'Akun Anda terkunci. Silahkan coba lagi setelah 5 menit atau hubungi admin',
    code: 400
  }
};

const successResponse = {
  loginSuccess: {
    message: 'Login Successfully',
    code: 200
  }
};

const ldapResponse = {
  accountLocked: '80090308: LdapErr: DSID-0C090400, comment: AcceptSecurityContext error, data 775, v1db1\u0000',
  invalidPassword: '80090308: LdapErr: DSID-0C090400, comment: AcceptSecurityContext error, data 52e, v1db1\u0000'
};

module.exports = {
  errorResponse,
  successResponse,
  ldapResponse
};
