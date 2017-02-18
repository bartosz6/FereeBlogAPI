using System.Threading.Tasks;
using Domain.User;
using Domain.User.Queries;
using Infrastructure.Interfaces;

namespace Application.QueryHandlers
{
    public class UserQueryHandler : IQueryHandler<GetUserByEmailQuery, ApplicationUser>
    {
        private readonly IRepository<ApplicationUser> _userReadRepository;
        
        public UserQueryHandler(IRepository<ApplicationUser> userReadRepository) {
            _userReadRepository = userReadRepository;
        }

        public async Task<ApplicationUser> Handle(GetUserByEmailQuery query)
        {
            var user = await _userReadRepository.Get(u => u.Email == query.Login);
            return user;
        }
    }
}