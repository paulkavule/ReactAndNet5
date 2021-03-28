using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using ReactAndNet5.Reactivities.Application.Photos;

namespace ReactAndNet5.Reactivities.Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file);
        Task<string> DeletePhoto(string publicId);
    
    }
}