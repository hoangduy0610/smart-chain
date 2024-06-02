<a name="readme-top"></a>
<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/hoangduy0610/smart-chain">
    <img src="https://placeholderlogo.com/img/placeholder-logo-1.png" alt="Logo" width="" height="80">
  </a>

  <h3 align="center">SmartChain -  Smart Supply Chain Solution</h3>

  <p align="center">
    Management solution for supply chain.
    <br />
    <a href="https://github.com/hoangduy0610/smart-chain"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/hoangduy0610/smart-chain">View Demo</a>
    ·
    <a href="https://github.com/hoangduy0610/smart-chain/issues">Report Bug</a>
    ·
    <a href="https://github.com/hoangduy0610/smart-chain/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#our-team">Our Team</a>
    </li>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## Our Team
- Leader: Nguyen Hoang Duy - [Github](https://github.com/hoangduy0610)
- Member: Nguyen Minh Hieu
- Member: Nguyen Quoc Khanh
- **Supervisor: Do Van Tien**

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/hoangduy0610/smart-chain)
[![Product Name Screen Shot][product-screenshot-2]](https://github.com/hoangduy0610/smart-chain)

SmartChain is a smart solution to tracking your products (Supply Chain). It's providing services for farmers, transporters and retailers. All information can be stored in blockchain (ETH networks).

**Features**

- User management: Administrators can control users and give access to the features of the system.
- Product management: Farmers can create and manage products.
- Batch management: Farmers can create and manage batches. Each product can create multiple batches.
- Transporter management: Consumers can create and manage transporter's bills. Each transporter can update its bill information.
- Retailer dashboard: Retailers can view the information of the products they have purchased.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

You can run directly try by using this [website](https://smcsoft.online/). Or to get a local copy up, please running follow these simple example steps below.

Video instructions: [Youtube](https://youtube.com/)

### Prerequisites

You need to install Visual Studio and Docker first.

* [Visual Studio](https://visualstudio.microsoft.com/)
* [Docker](https://docs.docker.com/desktop/install/windows-install/)

### Installation

1. Clone the repo
```sh
git clone https://github.com/hoangduy0610/smart-chain.git
```
2. Deploy your smart contract to target network (I'm using sepolia ETH). You can use Remix IDE to deploy your contract. The contract can be found in `SmartContract` folder.
3. Edit backend env file. You can follow this:
```
MODE=test
LOCK=true
SWAGGER_PASSWORD=Uit@1001
PORT=8798
LOGGER_ENABLE=true

APP_URL=https://smartchain.ddns.net/Frontend

DATABASE_HOST=mongodb+srv://admin:admin@mongodb/?retryWrites=true&w=majority&appName=supply-chain

EMAIL_FROM="SmartChain" <hoangduy06104@gmail.com>

REDIS_HOST=localhost
REDIS_PORT=14762
REDIS_USERNAME=default
REDIS_PASSWORD=12121212

MAIL_SMTP_HOST=smtp.gmail.com
MAIL_SMTP_PORT=587
MAIL_SMTP_USER=hoangduy06104@gmail.com
MAIL_SMTP_PASS=vndhsajhquirahs

OWNER_WALLET_SECRET=368e1ce2575281406f276156cb47f90131ef382e9b2d5b295e10de15f0953dab
PROVIDER_KEY=4YDWIK254REVXMNXQA6DYNRQ2XV6VZ7VP1
CONTRACT_ADDRESS=0xe003EA84cf279C158c04014078855D72173287d0
```
4. Run docker
```sh
docker-compose --env-file docker.env up -d --build
```
5. To restart all docker containers
```sh
docker restart $(docker ps -a -q)
```

Note: To create admin accounts, please enable test mode, and use swagger to create with endpoint `/develop`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] User Management
- [x] Product Management
- [x] Geolocation for transporters
- [x] Retailer dashboard
- [x] Analytics
- [ ] Smart Contract fully-intergration

See the [open issues](https://github.com/hoangduy0610/smart-chain/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Nguyen Hoang Duy (PO) - [@hoangduy0610](https://github.com/hoangduy0610) - hoangduy06104@gmail.com

Project Link: [https://github.com/hoangduy0610/smart-chain](https://github.com/hoangduy0610/smart-chain)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/hoangduy0610/smart-chain.svg?style=for-the-badge
[contributors-url]: https://github.com/hoangduy0610/smart-chain/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/hoangduy0610/smart-chain.svg?style=for-the-badge
[forks-url]: https://github.com/hoangduy0610/smart-chain/network/members
[stars-shield]: https://img.shields.io/github/stars/hoangduy0610/smart-chain.svg?style=for-the-badge
[stars-url]: https://github.com/hoangduy0610/smart-chain/stargazers
[issues-shield]: https://img.shields.io/github/issues/hoangduy0610/smart-chain.svg?style=for-the-badge
[issues-url]: https://github.com/hoangduy0610/smart-chain/issues
[license-shield]: https://img.shields.io/github/license/hoangduy0610/smart-chain.svg?style=for-the-badge
[license-url]: https://github.com/hoangduy0610/smart-chain/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/hoangduy06104
[product-screenshot]: assets/login.png
[product-screenshot-2]: assets/image.png