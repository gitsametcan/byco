using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace bycoAPI.Models
{
    
    public class Discount
    {
        [Key]  public int discount_id {  get; set; }
        public int user_id { get; set; }
        public int discount_rate { get; set; }
    }
}
