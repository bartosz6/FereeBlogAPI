using System;
using System.Collections.Generic;

namespace Domain.Tag
{
    public class Tag: IBaseDomainEntity
    {
        public IEnumerable<Domain.Post_Tag.PostTag> PostTags {get; set;}
        public string Name {get; set;}
        public Guid Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? Deleted { get; set; }

        public Tag(string name) : base()
        {
            Name = name;
        }
    }
}