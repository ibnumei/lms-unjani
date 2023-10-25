## API Spec

```
Member API

Login {No Need Token} : POST /lms-unjani/login
Logout {Need Token} : POST /lms-unjani/logout
Get Current User {Need Token} : GET /lms-unjani/user/:id

======================================================================================

Book API

ex: Tampilkan buku halaman 1 , jumlah buku  10 per halaman
Get With Paging {No Need Token} : /book?page=1&size=10

ex: Tampilan Buku halaman 1 , Jumlah buku 10 per halaman, title buku =like %psikologi%
Get With Paging With search By title {No Need Token} : /book?title=psikologi&page=1&size=10

ex: Tampilkan detail buku yang dipilih
Get Detail single book {No Need Token} : /book/:id
```