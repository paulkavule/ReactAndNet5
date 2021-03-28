using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using ReactAndNet5.Reactivities.Application.Interfaces;
using ReactAndNet5.Reactivities.Application.Photos;

namespace ReactAndNet5.Reactivities.infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;
        private readonly IOptions<CloudinarySettings> _config;
        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            this._config = config;
            var account = new Account(
                config.Value.Name,
                config.Value.Key,
                config.Value.Secret
            );

            _cloudinary = new Cloudinary(account);
        }

        public async Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            if(file.Length <= 0) return null;

            await using var stream  = file.OpenReadStream();
            var uploadPrams = new ImageUploadParams{
                File = new FileDescription(file.FileName, stream),
                Transformation = new Transformation().Height(500).Width(500).Crop("fill")
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadPrams);

            if(uploadResult.Error != null)
                throw new System.Exception(uploadResult.Error.Message);

            return new PhotoUploadResult{
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.ToString()
            };
        }

        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);

            return result.Result == "ok" ? result.Result : null;
        }
    }
}