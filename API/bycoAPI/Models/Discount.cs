using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace bycoAPI.Models
{
    [Keyless]
    public class Discount
    {
        public int discount_id {  get; set; }
        public int user_id { get; set; }
        public int discount_rate { get; set; }
    }
}
