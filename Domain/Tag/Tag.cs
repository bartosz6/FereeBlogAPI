using System;
using System.Collections.Generic;

namespace Domain.Tag
{
    public class Tag: IBaseDomainEntity
    {
        //TODO: no many-to-many in efCore
        public Domain.Post.Post Post {get; set;}
        public string Name {get; set;}
        public Guid Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? Deleted { get; set; }

        public Tag() : base() {}

        public Tag(string name) : base()
        {
            Name = name;
        }
    }
}