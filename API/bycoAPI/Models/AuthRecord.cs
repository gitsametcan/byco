using System.ComponentModel.DataAnnotations;

namespace bycoAPI.Models
{
    public class AuthRecord
    {
        [Key]
        public int authrecord_id { get; set; }
        public string token { get; set; }
        public DateTime tokenexpiredate { get; set; }
        public int user_id {  get; set; }
    }
}
