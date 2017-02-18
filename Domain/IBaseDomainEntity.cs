using System;

namespace Domain
{
    public interface IBaseDomainEntity
    {
        DateTime Created { get; set; }
        DateTime? Modified { get; set; }
        DateTime? Deleted { get; set; }
    }
}