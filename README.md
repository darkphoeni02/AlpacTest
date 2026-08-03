# AlpacApi

Resumen
Proyecto backend en .NET 10 (AlpacApi) con un ejemplo de repositorio en memoria. README en español con instrucciones para instalar, ejecutar, decisiones técnicas y tareas pendientes.

Requisitos
- .NET 10 SDK
- Visual Studio 2026 (opcional) o VS Code
- (Frontend) Node.js >= 16 y npm

Instalación y ejecución

Backend (AlpacApi)
1. Abrir una terminal (PowerShell recomendado).
2. Desde la raíz del repositorio:
   - Restaurar paquetes: `dotnet restore`
   - Compilar: `dotnet build`
3. Ejecutar la API:
   - CLI: `dotnet run --project AlpacApi/AlpacApi.csproj`
   - O abrir `AlpacApi.slnx` en Visual Studio y arrancar el proyecto `AlpacApi`.
4. Notas:
   - La app usa HTTPS (`app.UseHttpsRedirection()`). El puerto aparece en la salida de la consola o en `Properties/launchSettings.json`.
   - Si aparece la excepción CORS mencionada abajo, vea la sección "CORS".

Frontend (si existe carpeta cliente)
1. Entrar a la carpeta del frontend (ej.: `client` o `frontend`).
2. Instalar dependencias: `npm install`
3. Ejecutar en desarrollo: `npm start`
4. Ajustar el origen/puerto en la configuración de CORS del backend para permitir llamadas desde el frontend.

CORS — error conocido y solución

Error detectado: "The CORS protocol does not allow specifying a wildcard (any) origin and credentials at the same time." 

Contexto: en `Program.cs` se estaba registrando una política así:

	builder.Services.AddCors(options =>
		options.AddDefaultPolicy(policy =>
			policy.AllowAnyOrigin().AllowAnyHeader().AllowCredentials().AllowAnyMethod()
		)
	);

Por seguridad la especificación CORS no permite `AllowAnyOrigin()` junto con `AllowCredentials()`.

Opciones para resolverlo (elige la adecuada según tus necesidades):

- Si necesitas credenciales (cookies/credenciales con CORS): listar orígenes explícitos y usar `AllowCredentials()`:

```csharp
policy.WithOrigins("https://localhost:3000")
	  .AllowAnyHeader()
	  .AllowAnyMethod()
	  .AllowCredentials();
```

- Si quieres permitir cualquier origen (sin credenciales): eliminar `AllowCredentials()` y mantener `AllowAnyOrigin()`.

- Alternativa (menos recomendable): usar `SetIsOriginAllowed(...)` para permitir orígenes dinámicos, teniendo cuidado con seguridad.

Decisiones técnicas y justificación

- Plataforma: .NET 10 y ASP.NET Core Web API.
  - Razonamiento: compatibilidad con el ecosistema .NET moderno, rendimiento y productividad.

- DI y patrón de acceso a datos:
  - Se usa inyección de dependencias con interfaz `IBookRepository`.
  - Implementación actual: `InMemoryBookRepository` registrada como singleton para facilitar desarrollo.
  - Razonamiento: configuración mínima y pruebas locales rápidas.

- Persistencia:
  - Elegida inicialmente: almacenamiento en memoria (In-memory).
  - Ventajas: cero configuración, rápido para prototipado.
  - Limitaciones: datos volátiles, no apto para producción.

- Librerías clave (implícitas):
  - Microsoft.AspNetCore.* (Web API, CORS, DI).
  - No se ha incluido ORM ni base de datos en esta versión para mantener la simplicidad.

Qué quedó pendiente / qué haría distinto con más tiempo

- Persistencia: reemplazar InMemory por EF Core + migraciones y base de datos (SQL Server, Postgres, SQLite según necesidad).
- Configuración y secretos: mover cadenas de conexión y secretos a `appsettings` por entorno o Azure Key Vault / User Secrets.
- Documentación y pruebas: añadir Swagger/OpenAPI y tests unitarios e integración (xUnit).
- Autenticación y autorización: añadir JWT/OAuth2 y políticas de acceso.
- Infraestructura y despliegue: añadir Dockerfile, pipeline CI/CD (GitHub Actions/Azure DevOps), y entornos separados (dev/staging/prod).
- Observabilidad: Serilog / OpenTelemetry para logging, métricas y tracing.

Recomendaciones inmediatas

- Corregir la política CORS en `Program.cs` según la opción segura que necesites.
- Añadir Swagger para facilitar consumo de la API por el frontend.

Comparto link de la collection de Postman para pruebas: [Postman Collection](https://dark-rocket-338456.postman.co/workspace/My-Workspace~5a473efb-fb9a-4cc6-8b15-2f2264af67df/collection/27591909-22613548-4e96-4711-b09d-6e582b13e09a?action=share&creator=27591909) 
