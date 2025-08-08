---
sidebar_position: 6
---
# Backend Testing   
Functionality required by the "Pflichtenheft" must be tested.   
## Spring Boot Controller Testing   
### Scope   
We only test at the **controller layer**, verifying the correct HTTP behavior, request/response mapping, validation, and controller-service interaction. (→ Blackbox-Testing)   
No mocking of the controller, but mocking/stubbing of lower layers (e.g., services or repositories) is allowed when needed.   
### Default Tools   
1. **Spring Boot Test** ( `@SpringBootTest`) – for full application context tests (optional, slower).   
2. **@WebMvcTest** – for isolated controller tests (recommended for speed and focus).   
3. **MockMvc** – to simulate HTTP requests to the controller.   
4. **Mockito** – for mocking services under the controller.   
5. **AssertJ** / **Hamcrest** – for fluent assertions.   
6. **JUnit 5** – as default test engine.   
   
### Testing Approach   
- Use `@WebMvcTest(YourController.class)` to load only the web layer.   
- Inject `MockMvc` to perform requests.   
- Mock external services (e.g., service layer beans) with `@MockBean`.   
- Cover at least:   
    - Request mapping   
    - Validation rules   
    - Expected response codes and JSON bodies   
   
### Example Controller Test   
Let's say we have this simple controller:   
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
}
```

Here’s a corresponding controller test: (this file should lay inside `src/test/java/com/agilesoftwareengineering/[your-application]/UserControllerTest.class`)   
```java
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void shouldReturnUserById() throws Exception {
        UserDto user = new UserDto(1L, "Alice");
        Mockito.when(userService.getUserById(1L)).thenReturn(user);

        mockMvc.perform(get("/api/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Alice"));
    }
}
```
### Notes   
- Stick to controller-only logic (i.e., no testing service/repo logic here).   
- Run these tests on every merge or pull request.   
- Consider using [Testcontainers](https://www.testcontainers.org/) if you *eventually* expand to integration testing (e.g., testing DB + controller together).   
