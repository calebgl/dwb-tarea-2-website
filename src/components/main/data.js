export const data = [
	{
		id: 1,
		title: "Tarea #1 (Modificaciones)",
	},
	{
		id: 2,
		title: "Principios SOLID",
	},
	{
		id: 3,
		title: "Arquitectura de Servicios y Componentes",
	},
];

const Tarea1 = () => {
	return (
		<>
			<h3 id="list-item-1">Tarea #1</h3>
			<p>
				Durante la tarea #1 creamos un método en la clase{" "}
				<span className="font-italic">Program</span> el cual nos servía
				para hacer un <span>SELECT</span> a la tabla{" "}
				<span className="font-italic">Employees</span>:
			</p>
			<pre>
				<code>{`public static void SimpleSelect()
{
  var dataContext = new NorthwindContext();
  var employeeQuery = dataContext.Employees.Select(s => s);
  var output = employeeQuery.ToList();

  output.ForEach(fe => Console.WriteLine($"Nombre: {fe.FirstName}"));
  
}`}</code>
			</pre>
			<p>
				Para fines ilustrativos y poder realizar esta tarea #2,
				agregaremos 3 funciones más las cuales nos permitirán
				ejemplificar 2 de los principios de SOLID, así como también
				entender la importancia de la arquitectura de servicios y
				componentes.
			</p>
			<p>Función extra 1 (filtra los empleados por título):</p>
			<pre>
				<code>{`public static void Extra1(string title)
{
  var dataContext = new NorthwindContext();
  var employeeQuery = dataContext.Employees
    .Where(w => w.Title == title)
    .Select(s => s);

  var output = employeeQuery.ToList();

  output.ForEach(fe => Console.WriteLine($"Nombre: {fe.FirstName}"));
}`}</code>
			</pre>
			<p>
				Función extra 2 (se busca un empleado por id para después
				actualizar su nombre):
			</p>
			<pre>
				<code>{`public static void Extra2(string newName, int id = 1)
{
  var dataContext = new NorthwindContext();
  var currentEmployee = dataContext.Employees
    .Where(w => w.EmployeeId == id)
    .FirstOrDefault();

  if(currentEmployee == null)
    throw new Exception("No se encontró el empleado con el ID ingresado");
  
  currentEmployee.FirstName = newName;
  dataContext.SaveChanges();
}`}</code>
			</pre>
			<p>Función extra 3 (filtra los empleados por nombre):</p>
			<pre style={{ marginBottom: "0" }}>
				<code>{`public static void Extra3(string name)
{
  var dataContext = new NorthwindContext();
  var employeeQuery = dataContext.Employees
    .Where(w => w.FirstName == name)
    .Select(s => s);

  var output = employeeQuery.ToList();
  output.ForEach(fe => Console.WriteLine($"Nombre: {fe.FirstName}"));
}`}</code>
			</pre>
		</>
	);
};

const Solid = () => {
	return (
		<>
			<h3 id="list-item-2">Principios de SOLID</h3>
			<p>
				A partir de aquí comenzaremos a hacer{" "}
				<span className="font-italic">refactoring</span>. Como se puede
				observar, nuestras 4 cuatro funciones del apartado Tarea #1 usan
				una misma acción:
			</p>
			<pre>
				<code>{`var dataContext = new NorthwindContext();`}</code>
			</pre>
			<p>
				Para evitar instanciar el objeto 3 veces, declaramos la variable
				como atributo de la clase{" "}
				<span className="font-italic">Program</span>
			</p>
			<pre>
				<code>{`public static NorthwindContext dataContext = new();`}</code>
			</pre>
			<p>
				Siguiendo el primer principio de SOLID (
				<span className="font-italic">
					Single Responsability Principle
				</span>
				) podemos implementar una función la cual nos permitirá retornar
				todos los empleados.
			</p>
			<pre>
				<code>{`private static IQueryable<Employee>GetAllEmployees()
{
  return dataContext.Employees;	
}`}</code>
			</pre>
			<p>Implementado en nuestras tres funciones quedaría así:</p>
			<pre>
				<code>{`public static SimpleSelect()
{
  var employeeQuery = GetAllEmployees()...
}

public static Extra1(string title)
{
  var employeeQuery = GetAllEmployees()...
}

public static Extra2(string newName, int id)
{
  var currentEmployee = GetAllEmployees()...
}

public static Extra3(string name)
{
  var employeeQuery = GetAllEmployees()...
}`}</code>
			</pre>
			<p>
				Dentro de los métodos Extra1() y Extra3() nos interesa filtrar
				empleados por título y nombre, respectivamente. Podemos crear
				una función la cual se encarge de esto:
			</p>
			<pre>
				<code>{`public static IQueryable<Employee> GetEmployeesBy(string type,string search)
{
  if(type == "title")
	  GetAllEmployees().Where(w => w.Title == search).Select(s => s);
  else if (type == "name")
	  GetAllEmployees().Where(w => w.FirstName == search).Select(s => s);
}`}</code>
			</pre>
			<p>
				Pero si nos ponemos a pensar, el día de mañana tal vez queramos
				filtrar empleados en base a otra cosa, por ejemplo una ciudad o
				título, con lo cual tendríamos que editar la función que
				previamente creamos. Esto viola el segundo principio de SOLID{" "}
				<span className="font-italic">(Open-Closed Principle)</span>,
				pues se supone que debería estar cerrado a modificaciones y
				abierto a adiciones. Una manera de solventar esto es por medio
				de clases de la siguiente manera:
			</p>
			<pre>
				<code>{`public abstract class EmployeeFilterSpecification
{
  public IQueryable<Employee> Filter()
  {
    return ApplyFilter(GetAllEmployees());
  }

  protected abstract IQueryable<Employee> ApplyFilter(IQueryable<Employee> employees);
}`}</code>
			</pre>
			<p>
				Y ahora crearemos una clase por filtro heredando la previamente
				creada:
			</p>
			<pre>
				<code>{`public class EmFilterName : EmployeeFilterSpecification
{
  private string name;

  public EmFilterName(string name)
  {
    this.name = name;
  }

  protected override IQueryable<Employee> ApplyFilter(IQueryable<Employee> employees)
  {
    return employees.Where(w => w.FirstName == this.name).Select(s => s);
  }
}`}</code>
			</pre>
			<pre>
				<code>{`public class EmFilterTitle : EmployeeFilterSpecification
{
  private string title;

  public EmFilterTitle(string title)
  {
    this.title = title;
  }

  protected override IQueryable<Employee> ApplyFilter(IQueryable<Employee> employees)
  {
    return employees.Where(w => w.Title == this.title).Select(s => s);
  }
}`}</code>
			</pre>
			<pre>
				<code>{`public class EmFilterId : EmployeeFilterSpecification
{
  private int id;

  public EmFilterId(int id)
  {
    this.id = id;
  }

  protected override IQueryable<Employee> ApplyFilter(IQueryable<Employee> employees)
  {
    return employees.Where(w => w.EmployeeId == this.id).Select(s => s);
  }
}`}</code>
			</pre>
			<p>
				Ya con los distintos filtros hechos podemos proseguir a crear su
				controlador:
			</p>
			<pre>
				<code>{`public class EmployeeFilter
{
  public IQueryable<Employee> FilterBy(EmployeeFilterSpecification filter)
  {
    return filter.Filter();
  }
}`}</code>
			</pre>
			<p>
				Con esto hecho ya estamos respetando el segundo principio de
				SOLID. ¿Cómo implementarlo? Muy sencillo, aquí el cómo quedarían
				nuestras funciones con dicha implementación:
			</p>
			<pre>
				<code>{`public static void Extra1(string title)
{
  var filter = new EmployeeFilter();
  var result = filter.FilterBy(new EmFilterTitle(title));
  var output = result.ToList();

  output.ForEach(fe => Console.WriteLine($"Nombre: {fe.FirstName}"));
}

public static void Extra2(string newName, int id = 1)
{
  var filter = new EmployeeFilter();
  var result = filter.FilterBy(new EmFilterId(id));
  var currentEmployee = result.ToList().FirstOrDefault();

  if (currentEmployee == null)
    throw new Exception("No se encontró el empleado con el ID ingresado");

  currentEmployee.FirstName = newName;
  dataContext.SaveChanges();
}

public static void Extra3(string name)
{
  var filter = new EmployeeFilter();
  var result = filter.FilterBy(new EmFilterName(name));
  var output = result.ToList();

  output.ForEach(fe => Console.WriteLine($"Nombre: {fe.FirstName}"));
}`}</code>
			</pre>
			<p>De la función Extra2() podemos extraer la siguiente:</p>
			<pre>
				<code>{`public static void UpdateEmployeeFirstNameById(string newName, int id = 1)
{
  var filter = new EmployeeFilter();
  var result = filter.FilterBy(new EmFilterId(id));
  var currentEmployee = result.ToList().FirstOrDefault();

  if (currentEmployee == null)
    throw new Exception("No se encontró el empleado con el ID ingresado");

  currentEmployee.FirstName = newName;
  dataContext.SaveChanges();
}`}</code>
			</pre>
			<p>Y ahora Extra2() quedaría así:</p>
			<pre>
				<code>{`public static Extra2(string newName, int id = 1)
{
  UpdateEmployeeFirstNameById(newName, id);
}`}</code>
			</pre>
			<p>
				Esto se hizo porque, como veremos a continuación en arquitectura
				de servicios y componentes, no debemos de tener la variable
				dataContext al alcance de todos y tampoco en la capa "exterior".
			</p>
		</>
	);
};

const Arquitectura = () => {
	return (
		<div className="list-item" id="list-item-3">
			<h3>Arquitectura de Servicios y Componentes</h3>
			<p>
				Después de haber estructurado mejor nuestro código, podemos ver
				como nuestro archivo{" "}
				<span className="font-italic">Program</span> creció
				considerablemente. Si siguieramos implementando nuevas
				funcionalidades, la manteniblidad de nuestro código sería nula.
				Es por ello que existe la arquitectura de servicios y
				componentes. Esta nos permite separar nuestras clases de una
				manera ordenada y fácil de comprender. Para comenzar creemos una
				carpeta separada dentro de nuestro proyecto, la llamarermos{" "}
				<span className="font-italic">Services</span> (aunque puede
				tener cualquier nombre simpre que sea identificable). Dentro de
				esta carpeta organizaremos nuestras clases, la primera será{" "}
				<span className="font-italic">BaseSC</span> (SC aludiendo a{" "}
				<span className="font-italic">Service Component</span>) en ella
				agregaremos nuestra variable dataContext (Será de acceso
				protected para que esta solo pueda ser usada por clases dentro
				de la capa de servicios al heredarla):
			</p>
			<pre>
				<code>
					{`public class BaseSC
{
  protected NorthwindContext dataContext = new();
}`}{" "}
				</code>
			</pre>
			<p>
				Dentro de la misma carpeta crearemos otra clase a la cual
				llamaeremos <span className="font-italic">EmployeeSC</span>,
				esta heredará de la clase{" "}
				<span className="font-italic">BaseSC</span>, como habíamos dicho
				previamente para permitirle acceder a la inforamción de la base
				de datos
			</p>
			<pre>
				<code>{`public class EmployeeSC : BaseSC {}`}</code>
			</pre>
			<p>
				Dentro de la clase{" "}
				<span className="font-italic">EmployeeSC</span> moveremos todo
				lo relacionado con la extracción de información de la tabla{" "}
				<span className="font-italic">Employee</span>, con la diferencia
				de que ninguo de los métodos será estático.
			</p>
			<pre>
				<code>{`public class EmployeeSC : BaseSC 
{
  public IQueryable<Employee> GetAllEmployees()
  {
    return dataContext.Employees;
  }

  public void UpdateEmployeeFirstNameById(string newName, int id = 1)
  {
    var filter = new EmployeeFilter();
    var result = filter.FilterBy(new EmFilterId(id));
    var currentEmployee = result.ToList().FirstOrDefault();

    if (currentEmployee == null)
      throw new Exception("No se encontró el empleado con el ID ingresado");

    currentEmployee.FirstName = newName;
    dataContext.SaveChanges();
  }

  public abstract class EmployeeFilterSpecification
  {
    public IQueryable<Employee> Filter()
    {
      return ApplyFilter(new EmployeeSC().GetAllEmployees());
    }

    protected abstract IQueryable<Employee> ApplyFilter(IQueryable<Employee> employees);
  }

  public class EmployeeFilter
  {
    public IQueryable<Employee> FilterBy(EmployeeFilterSpecification filter)
    {
      return filter.Filter();
    }
  }

  public class EmFilterName : EmployeeFilterSpecification
  {
    private string name;

    public EmFilterName(string name)
    {
      this.name = name;
    }

    protected override IQueryable<Employee> ApplyFilter(IQueryable<Employee> employees)
    {
      return employees.Where(w => w.FirstName == this.name).Select(s => s);
    }
  }

  public class EmFilterTitle : EmployeeFilterSpecification
  {
    private string title;

    public EmFilterTitle(string title)
    {
      this.title = title;
    }

    protected override IQueryable<Employee> ApplyFilter(IQueryable<Employee> employees)
    {
    return employees.Where(w => w.Title == this.title).Select(s => s);
    }
  }

  public class EmFilterId : EmployeeFilterSpecification
  {
    private int id;

    public EmFilterId(int id)
    {
      this.id = id;
    }

    protected override IQueryable<Employee> ApplyFilter(IQueryable<Employee> employees)
    {
      return employees.Where(w => w.EmployeeId == this.id).Select(s => s);
    }
  }
}`}</code>
			</pre>
			<p>
				Por último, dentro de nuestra clase{" "}
				<span className="font-italic">Program</span> instanciaremos un
				objeto tipo <span className="font-italic">EmployeeSC</span> que
				nos permita hacer uso de los métodos que previamente teniamos en
				la misma
			</p>
			<pre>
				<code>{`public static EmployeeSC employeeSC = new();`}</code>
			</pre>
			<p>
				Y simplemente donde antes llamabamos a nuestros métodos de
				empleado, agregamos employeeSC al comienzo. Al final nuestra
				clase <span className="font-italic">Program</span> quedaría así:
			</p>
			<pre style={{ marginBottom: "0" }}>
				<code>{`class Program
{
  public static void SimpleSelect()
  {
    var employeeQuery = new EmployeeSC().GetAllEmployees().Select(s => s);
    var output = employeeQuery.ToList();

    output.ForEach(fe => Console.WriteLine($"Nombre: {fe.FirstName}"));
  }

  public static void Extra1(string title)
  {
    var filter = new EmployeeSC.EmployeeFilter();
    var result = filter.FilterBy(new EmployeeSC.EmFilterTitle(title));
    var output = result.ToList();

    output.ForEach(fe => Console.WriteLine($"Nombre: {fe.FirstName}"));
  }

  public static void Extra2(string newName, int id = 1)
  {
    new EmployeeSC().UpdateEmployeeFirstNameById(newName, id);
  }

  public static void Extra3(string name)
  {
    var filter = new EmployeeSC.EmployeeFilter();
    var result = filter.FilterBy(new EmployeeSC.EmFilterName(name));
    var output = result.ToList();

    output.ForEach(fe => Console.WriteLine($"Nombre: {fe.FirstName}"));
  }

  static void Main(string[] args)
  {
    //Code
  }
}`}</code>
			</pre>
		</div>
	);
};

export const Array = [<Tarea1 />, <Solid />, <Arquitectura />];
