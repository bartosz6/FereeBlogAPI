using System.ComponentModel.DataAnnotations;

namespace Web.Models.Blog
{
    public class AddModel
    {
        [Required]
        [MinLength(5)]
        public string Content {get; set;}
        public string BannerImageBASE64 {get; set;}
    }
}