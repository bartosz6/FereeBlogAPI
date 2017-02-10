using System;

namespace Domain
{
    public class BaseDomainEntity
    {
        public Guid Id {get; set;}
        public DateTime Created { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? Deleted { get; set; }

        public BaseDomainEntity() {
            Created = DateTime.UtcNow;
        }
    }
}