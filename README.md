# Art Gallery Demo Project
A multi-part project to teach LaunchCode students to build a Java web application with Spring Boot in conjunction with an SQL database and then fetch data from a React front end application.

### HOW TO USE THIS REPO
Unlike some of my other repos, I am merging the completed project to the `main` branch.

If you wish to code the project from the beginning, use this README for instructions. If you wish to code from another point, choose from several branches for the starter code. You may also view the solution branches for each part throughout the project, and of course `main` is the final solution for all parts.

### GETTING STARTED
There is no starter branch for Part 1 because part of the process is creating the app from scratch. Here are some basic steps to follow to get to the Part 1 solution:

#### Generate a New Spring Boot Project with Spring Initializr
1. Create a new GitHub repo with a README and clone to your local machine.
1. Go to [start.spring.io](https://start.spring.io)
1. Select Maven and Java 21, keep the current selected version of Spring Boot, and set the group and artifact to `org.launchcode` and `art-gallery-backend` so that the full package name is `org.launchcode.art-gallery-backend`.
1. Add the Spring Web and Spring Boot Devtools dependencies.
1. Click on "Generate" to download the zipped file to your local machine.
1. Unzip the file and move the entire project into your new repo folder.

#### Create a Model Class for `Artwork`
1. Add a package called `models` in `/src/main/java/org/launchcode/art_gallery_backend` (alongside the `controllers` package).
1. Create a Java class inside that package called `Artwork`.
1. Set up the class with a final `id` integer, a `title` string, and an `artist` string. Create a static `nextId` int initialized to `1` to manage unique `id` assignments.
1. Generate a basic constructor, getters and setters. Update the constructor so that it takes in `title` and `artist` but uses `nextId` to assign the `id`, then increments `nextId` for future artwork objects.
1. Generate an override for `toString()` and have it return a string in the format of "Artwork Title by Artist Name".
1. Generate an override for `equals()` and `hashCode()` based on `id`.

#### Create a Temporary Data Layer to Simulate a Database
1. Add a package called 'data' in `/src/main/java/org/launchcode/art_gallery_backend`.
1. Create a Java class inside that package called `ArtworkData`.
1. Add a private static final Map called `artworks` that is initialized as a new HashMap.
1. Create methods called `getAll()`, `addNew()`, and `getById()` that perform CRUD ops with the `artworks` HashMap.

#### Create `ArtworkController`
1. Add a package called `controllers` in `/src/main/java/org/launchcode/art_gallery_backend`.
1. Create a Java class inside that package called `ArtworkController`.
1. Add the `@RestController` annotation at the class level so Spring knows this is a controller class that will handle HTTP requests and responses.
1. Add the `@RequestMapping` annotation at the class level and set the base path to `/api/artworks`.
1. Add a controller method called `getAllArtworks()` that returns the full list of artworks from the HashMap in the data layer. The endpoint should simply be the same as the base path.
1. Add a controller method called `addNewArtwork()` that puts a new artwork in the HashMap in the data layer. The endpoint should be the base path plus `/add`
1. Add a controller method called `getArtworkById()` that accepts a path variable and returns a single artwork object as JSON by default. The endpoint should be the base path plus `/details/{artworkId}` to allow for dynamic requests with different ids.
1. Add a controller method called `displayArtworkDetails()` that accepts a path variable as above but returns formatted information on a single artwork object as HTML instead of JSON. Append `/html` to this endpoint.

#### Test Endpoints with Postman
1. Create a collection in Postman that tests all four of the endpoints defined in your controller. Make sure they are returning/receiving data as expected.

You're off to a good start! Continue with the `TODO`s in the `part2-starter-connect-database` branch.
