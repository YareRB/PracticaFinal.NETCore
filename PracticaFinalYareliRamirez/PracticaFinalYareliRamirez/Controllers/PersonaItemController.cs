using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PracticaFinalYareliRamirez.Models;

namespace PracticaFinalYareliRamirez.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonaItemController : Controller
    {
       private readonly TareasdbContext _context;
        public PersonaItemController(TareasdbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<PersonaItem> lista = await _context.PersonaItems.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] PersonaItem request)
        {
            await _context.PersonaItems.AddAsync(request);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] PersonaItem request)
        {
            _context.PersonaItems.Update(request);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            PersonaItem personaItem = _context.PersonaItems.Find(id);

            _context.PersonaItems.Remove(personaItem);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
