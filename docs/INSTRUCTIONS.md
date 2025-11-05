<img width="1029" height="72" alt="Midtown Art Gallery banner" src="https://github.com/user-attachments/assets/3ce29796-5eef-4d19-b2ae-b827fba5519f" />

# Art Gallery Demo Project — Student Instructions

<div align="right">
    <a href="http://www.codewithcarrie.com" target="_blank">
        <img src="https://img.shields.io/badge/by-CodeWithCarrie.com-blue?style=for-the-badge" alt="badge linking to CodeWithCarrie website" />
    </a>
</div>

> [!NOTE]
> LaunchCode students! This project will teach you to build a Java web application with Spring Boot in conjunction with an SQL database and then set up a React front end application to fetch data from the back end API.
>
> *It is best used in conjunction with live code demos or recordings of past live demos in 2025 (available internally in LaunchCode).*

<div align="center">
  <img src="https://img.shields.io/badge/JavaScript-F0DB4F?style=for-the-badge&logo=javascript&logoColor=323330" alt="JavaScript" />
  <img src="https://img.shields.io/badge/React-61DBFB?style=for-the-badge&logo=react&logoColor=20232A" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge" alt="Java" />
  <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/MySQL-00758F?style=for-the-badge" alt="MySQL" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/CSS-rebeccapurple?style=for-the-badge&logo=css&logoColor=white" alt="CSS" />
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" alt="Spring Security" />
</div>

## HOW TO USE THIS REPO
Unlike some of my other repos, I merged the completed project to the `main` branch, and I am continuing to build it out far past the scope of LaunchCode's course as my own portfolio piece. As a result, the primary [README](README.md) has a much broader audience.

**If you wish to code the project from the beginning, use the instructions below.** If you wish to code from another point, choose from several branches for the starter code. You may also view the solution branches for each part throughout the project, and of course `main` is the final solution for all parts.

---

## GETTING STARTED

> [!TIP]
> There is no starter branch for Part 1 because part of the process is creating the app from scratch. Keep reading!

### Generate a New Spring Boot Project with Spring Initializr
1. Create a new GitHub repo with a README and clone to your local machine.
1. Go to [start.spring.io](https://start.spring.io)
1. Select Maven and Java 21, keep the current selected version of Spring Boot, and set the group and artifact to `org.launchcode` and `art-gallery-backend` so that the full package name is `org.launchcode.art-gallery-backend`.
1. Add the Spring Web and Spring Boot Devtools dependencies.
1. Click on "Generate" to download the zipped file to your local machine.
1. Unzip the file and move the entire project into your new repo folder.

### Create a Model Class for `Artwork`
1. Add a package called `models` in `/src/main/java/org/launchcode/art_gallery_backend` (alongside the `controllers` package).
1. Create a Java class inside that package called `Artwork`.
1. Set up the class with a final `id` integer, a `title` string, and an `artist` string. Create a static `nextId` int initialized to `1` to manage unique `id` assignments.
1. Generate a basic constructor, getters and setters. Update the constructor so that it takes in `title` and `artist` but uses `nextId` to assign the `id`, then increments `nextId` for future artwork objects.
1. Generate an override for `toString()` and have it return a string in the format of "Artwork Title by Artist Name".
1. Generate an override for `equals()` and `hashCode()` based on `id`.

### Create a Temporary Data Layer to Simulate a Database
1. Add a package called 'data' in `/src/main/java/org/launchcode/art_gallery_backend`.
1. Create a Java class inside that package called `ArtworkData`.
1. Add a private static final Map called `artworks` that is initialized as a new HashMap.
1. Create methods called `getAll()`, `addNew()`, and `getById()` that perform CRUD ops with the `artworks` HashMap.

### Create `ArtworkController`
1. Add a package called `controllers` in `/src/main/java/org/launchcode/art_gallery_backend`.
1. Create a Java class inside that package called `ArtworkController`.
1. Add the `@RestController` annotation at the class level so Spring knows this is a controller class that will handle HTTP requests and responses.
1. Add the `@RequestMapping` annotation at the class level and set the base path to `/api/artworks`.
1. Add a controller method called `getAllArtworks()` that returns the full list of artworks from the HashMap in the data layer. The endpoint should simply be the same as the base path.
1. Add a controller method called `addNewArtwork()` that puts a new artwork in the HashMap in the data layer. The endpoint should be the base path plus `/add`
1. Add a controller method called `getArtworkById()` that accepts a path variable and returns a single artwork object as JSON by default. The endpoint should be the base path plus `/details/{artworkId}` to allow for dynamic requests with different ids.
1. Add a controller method called `displayArtworkDetails()` that accepts a path variable as above but returns formatted information on a single artwork object as HTML instead of JSON. Append `/html` to this endpoint.

### Test Endpoints with Postman
1. Create a collection in Postman that sets up all four of the endpoints defined in your controller. 
1. Test each endpoint, making sure they are returning/receiving data as expected.

> [!NOTE]
> *You're off to a good start!* Continue with the `TODO`s in the `part2-starter-connect-database` branch.
