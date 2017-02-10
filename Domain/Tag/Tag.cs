using System.Collections.Generic;

namespace Domain.Tag
{
    public class Tag: BaseDomainEntity
    {
        public IEnumerable<Domain.Post_Tag.PostTag> PostTags {get; set;}
        public string Name {get; set;}
    }
}