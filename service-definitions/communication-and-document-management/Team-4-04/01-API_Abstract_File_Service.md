# API

## General Structure

### `/files`

#### GET
Search the files with given query parameters.
To use negation, add `!` as the first character.

**Parameters for filtering:**

- `tag`
- `name`
- `owner`
- `access`
- `location`: Folder to search in.
- `option`: For the above parameters, the filters can be combined with `and` / `or`
- `time`: What timestamp to use (`createdAt` / `updatedAt`)
  - `start`: Beginning of the time range
  - `end`: End of the time range
- `sort`: The datatype to sort on
- `asc`: Boolean for ascending / descending order
- `fuzziness`: How strict the input must match for searching file names.(0–5)

**Pagination Parameters:**

- `page`: Page number to return
- `limit`: Number of entries per page

#### POST
Upload a file.
To create a directory, omit the `file` parameter.

---

### `/files/{file-id}`

#### GET
Get the properties of a file by ID.

#### PATCH
Update selected properties of the file.

#### POST
Update the **content** of the file.

#### PUT
Completely update the file.
Current properties and content will be replaced with the provided data.

#### DELETE
Delete the file.

---

### `/files/{file-id}/content`

#### GET
Retrieve the binary content of the file.

---

## Our Openapi Generator Configuration

In ``<dependencies></dependencies>``:

```xml
<!-- OpenApiDependencies -->
        <dependency>
            <groupId>io.swagger.core.v3</groupId>
            <artifactId>swagger-annotations</artifactId>
           <version>2.2.36</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/jakarta.validation/jakarta.validation-api -->
        <dependency>
            <groupId>jakarta.validation</groupId>
            <artifactId>jakarta.validation-api</artifactId>
            <version>3.1.1</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.openapitools/jackson-databind-nullable -->
        <dependency>
            <groupId>org.openapitools</groupId>
            <artifactId>jackson-databind-nullable</artifactId>
            <version>0.2.6</version>
        </dependency>
```

In ``<plugins></plugins>``:
```xml
<plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>build-helper-maven-plugin</artifactId>
                <version>3.3.0</version>
                <executions>
                    <execution>
                        <id>add-source</id>
                        <phase>generate-sources</phase>
                        <goals>
                            <goal>add-source</goal>
                        </goals>
                        <configuration>
                            <sources>
                                <source>${project.build.directory}/src/gen/java/main</source>
                            </sources>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.openapitools</groupId>
                <artifactId>openapi-generator-maven-plugin</artifactId>
                <version>7.14.0</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>generate</goal>
                        </goals>
                        <configuration>
                            <source>${java.version}</source>
                            <target>${java.version}</target>
                            <inputSpec>${project.basedir}/src/main/resources/META-INF/fileService.openapi.yaml</inputSpec>
                            <output>${project.build.directory}/</output>
                            <modelPackage>${base.package}.model</modelPackage>
                            <apiPackage>${base.package}.api</apiPackage>
                            <invokerPackage>${base.package}.handler</invokerPackage>
                            <generatorName>spring</generatorName>
                            <configOptions>
                                <sourceFolder>src/gen/java/main</sourceFolder>
                                <configPackage>${base.package}.configuration</configPackage>
                                <useSpringBoot3>true</useSpringBoot3>
                                <interfaceOnly>true</interfaceOnly>
                            </configOptions>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
```

---

## TODO

Coming changes to the API:

- Setting minimum and maximum values
  *(Depends on the implementation — research is ongoing)*

---

### Definition:
The API is defined in [team-4-backend-abstract-file-service/src/main/resources/META-INF/fileService.openapi.yaml](https://github.com/Agile-Software-Engineering-25/team-4-backend-abstract-file-service/blob/main/src/main/resources/META-INF/fileService.openapi.yaml)