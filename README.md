# SatyaTatva - Explore the Wisdom of Sanatan Dharma

<div align="center">
  <a href="https://satyatatva.com">
    <picture>
      <img alt="SatyaTatva logo" src="https://satyatatva.com/logos/SatyaTatva_FI_NB.png" height="128">
    </picture>
  </a>
  <h1>SatyaTatva</h1>
</div>

SatyaTatva is an **open source** and **non profit** organization.

SatyaTatva is a platform that offers an engaging way to explore the timeless wisdom of **Sanatan Dharma**. Our website provides access to the **Vedas**, **Upanishads**, **Puranas**, and sacred **Shlokas** in a user-friendly format. In addition, SatyaTatva offers key **epic books** like **Ramayana**, **Mahabharata**, and more.

With support for offline access (PWA) and page-flipping UI for books, SatyaTatva is optimized for **cross-device** usage, bringing you the sacred knowledge of ancient texts right at your fingertips.

[Visit the Website](https://satyatatva.com)

---

## Features

- **Vedas:** Access to all Vedas in English and Hindi.
- **Puranas and Upanishads:** Explore the sacred texts of Sanatan Dharma.
- **Shlokas:** Recite shlokas like Hanuman Chalisa, Shiv Tandav Stotram, and more.
- **Books:** Read epic works like Ramayana, Mahabharata, and Ram Charitramanas.
- **Page-Flipping UI:** A user-friendly book experience.
- **PWA Support:** Offline access to your favorite texts.
- **Cross-Device Compatibility:** Access across mobile, tablet, and desktop devices.

---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Folder Structure](#folder-structure)
4. [Development](#development)
5. [Contributing](#contributing)
6. [License](#license)
7. [Contact](#contact)

---

## Installation

To get started with **SatyaTatva**, follow these steps to clone the repository and set up your local development environment.

### Prerequisites

- **Node.js** (Version 14.x or higher)
- **npm** (Node Package Manager)

### Steps

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/helsinfranz/satyatatva.git
   cd satyatatva
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. For the **mock server** (to simulate the backend functionality):

   - Navigate to the `server` folder:

     ```bash
     cd server
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the server:

     ```bash
     node index.js
     ```

4. After setting up the server, you can run the **Next.js application**:

   ```bash
   npm run dev
   ```

   This will start the application on [http://localhost:3000](http://localhost:3000).

---

## Usage

- Visit the website and explore the **Vedas**, **Puranas**, **Upanishads**, **Shlokas**, and **Books**.
- For a detailed **book reading experience**, use the **page-flipping UI**.
- You can also enable **offline access** via PWA features for accessing content even when you’re offline.

---

## Folder Structure

Here's a breakdown of the project's folder structure:

```
satyatatva/
│
├── public/               # Public static files (images, fonts, etc.)
│   ├── logos/            # SatyaTatva logo
│   └──  ...
│
├── pages/                # Next.js pages
│   ├── index.js          # Home page
│   └── ...               # Other page files
│
├── components/           # Reusable components (headers, footers, etc.)
│   ├── header
│   ├── footer
│   └── ...               # Other shared components
│
├── server/               # Mock server (used for dummy data and testing)
│   ├── index.js          # Main server file
│   └── ...               # Other server-related files
│
└── package.json          # Project dependencies and scripts
```

### Server Folder

- The **server** folder simulates the backend for **SatyaTatva**. The mock server serves dummy PDF and simulates the fetching of data.
- To run the mock server, follow the steps mentioned in the **Installation** section.

---

## Development

### Running Locally

To run the project locally, simply follow the steps mentioned above in the **Installation** section. The mock server provides simulated data and PDFs, and the front-end will fetch it to display on the website.

### Building for Production

To create a production build, run the following command:

```bash
npm run build
```

This will build your application and optimize it for production. Once the build is complete, you can start the production server:

```bash
npm run start
```

---

## Contributing

We welcome contributions from the open-source community. If you'd like to contribute to SatyaTatva, please follow these guidelines:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

For detailed guidelines, check the [CONTRIBUTING.md](https://github.com/helsinfranz/satyatatva/blob/main/CONTRIBUTING.md).

---

## License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](https://opensource.org/licenses/Apache-2.0) file for details.

---

## Contact

For any questions or suggestions, feel free to reach out via email at [satyatatva108@gmail.com](mailto:satyatatva108@gmail.com).

You can also visit our website: [SatyaTatva](https://satyatatva.com).

---

## Links

- [SatyaTatva GitHub Repository](https://github.com/helsinfranz/satyatatva)
- [License Information](https://opensource.org/licenses/Apache-2.0)
- [Contributing Guidelines](https://github.com/helsinfranz/satyatatva/blob/main/CONTRIBUTING.md)
- [Community Discussions](https://github.com/helsinfranz/SatyaTatva/discussions)
- [Discord Community](https://discord.gg/4kqYu5UCEH)

---

## Additional Information

Feel free to explore and contribute to SatyaTatva. We encourage feedback and suggestions to help improve the project!

---

## Roadmap

This section outlines the future goals and features we aim to implement for SatyaTatva.

### Upcoming Features

- **Expand the Text Library**: Adding more books from the Sanatan Dharma.
- **User Contributions**: Allow users to contribute translations, shlokas, or even their interpretations of sacred texts.
- **Enhanced Search and Filtering**: Implement more advanced search capabilities for users to quickly find specific verses or chapters.
- **Multi-Language Support**: Expand the website to support more languages, especially for texts like the **Vedas** and **Upanishads**.
- **Audio Features**: Include audio recitations of important texts for a more immersive experience.
- **Interactive Features**: Add features such as verse translation, commentary, and discussions to deepen the learning experience.

---

## FAQs

### 1. How can I access content offline?

You can use our Progressive Web App (PWA) feature. Simply visit the website, and it will prompt you to add it to your home screen. Once added, you can access the content even when you're offline.

### 2. How do I contribute to the project?

Check out the [Contributing Guidelines](https://github.com/helsinfranz/satyatatva/blob/main/CONTRIBUTING.md) to get started. Feel free to fork the repo, make changes, and submit a pull request!

### 3. How are books and content stored on the website?

We store each book in **PDF** format within the `server/` directory. This ensures easy access and download for all users through API.

### 4. Can I contribute translations or interpretations?

Yes! We encourage contributions of translations, interpretations, and additional commentary on any of the texts. Please follow our [contributing guidelines](https://github.com/helsinfranz/satyatatva/blob/main/CONTRIBUTING.md).

### 5. Do you offer any mobile apps?

Currently, we offer **PWA support** for mobile devices, ensuring that users can access the content seamlessly on any device, with offline capabilities.

---

## Known Issues

Here are some known issues in the project that are being worked on:

- **PDF Loading Delay**: Some large PDF files may take time to load. We're working on optimizing the loading experience.
- **Responsive Design on Older Devices**: We are currently testing and enhancing the responsiveness for certain older devices and browsers.
- **Search Functionality**: The search function can sometimes yield less relevant results. We plan to improve this by implementing advanced filters and search algorithms.

---

## Acknowledgments

We would like to extend our gratitude to the following:

- **Contributors:** Thanks to all the contributors for their valuable time and effort.
- **Open-Source Libraries:** This project uses several open-source libraries that made our work much easier. Special thanks to:
  - [Next.js](https://nextjs.org)
  - [React](https://reactjs.org)
  - [Express](https://expressjs.com/)
  - [Uiverse](https://uiverse.io/)

---

## Support

If you run into any issues or need support, you can:

- **Open an issue** in the GitHub repository: [GitHub Issues](https://github.com/helsinfranz/satyatatva/issues)
- **Contact Us**: Email us at [satyatatva108@gmail.com](mailto:satyatatva108@gmail.com).

---

## Community

We encourage open discussion and learning in our community. Join us on our official forums and community channels:

- **GitHub Discussions**: [SatyaTatva Discussions](https://github.com/helsinfranz/SatyaTatva/discussions)
- **Discord Server**: Join our [Discord](https://discord.gg/4kqYu5UCEH) for live discussions, suggestions, and support.

---

## Additional Resources

- [SatyaTatva Blog](https://satyatatva.com/blog) - Read insightful articles on the meanings and importance of the sacred texts (Coming Soon).
- [License](https://opensource.org/licenses/Apache-2.0) - View the open-source license under which SatyaTatva is published.

---

## Changelog

### [v0.1.0] - 2025-01-21

- Initial release of SatyaTatva.
- Published **Vedas**, **Puranas**, **Upanishads**, **Shlokas**, and **Books** in the book library.
- Added **PWA support** for offline access.

---

## Conclusion

Thank you for exploring **SatyaTatva**! We are committed to bringing the wisdom of Sanatan Dharma to the world in an accessible and engaging way. Feel free to contribute, suggest new features, and help us spread the light of this ancient knowledge.

Stay connected, stay inspired!
