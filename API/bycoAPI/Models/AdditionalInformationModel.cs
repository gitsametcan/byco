using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace bycoAPI.Models {
    [Keyless]
    public class AdditionalInformationModel {
        public string key {  get; set; }
        public string value {  get; set; }
    }
}
