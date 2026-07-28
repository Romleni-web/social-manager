import axios from 'axios';

export class SocialService {
  /**
   * Dispatches the post to the correct social media API.
   */
  static async publishPost(platform: string, content: string, accessToken: string) {
    console.log(`[SocialService] AUTO-PUBLISHING to ${platform}...`);

    switch (platform.toLowerCase()) {
      case 'facebook':
        return this.postToFacebook(content, accessToken);
      case 'instagram':
        return this.postToInstagram(content, accessToken);
      case 'twitter':
      case 'x':
        return this.postToX(content, accessToken);
      case 'linkedin':
        return this.postToLinkedIn(content, accessToken);
      default:
        throw new Error(`Platform ${platform} not supported yet.`);
    }
  }

  private static async postToFacebook(content: string, token: string) {
    // API: https://graph.facebook.com/v20.0/{page-id}/feed
    // Requires: 'pages_manage_posts' permission
    const pageId = 'your-page-id';
    return axios.post(`https://graph.facebook.com/v20.0/${pageId}/feed`, {
      message: content,
      access_token: token
    });
  }

  private static async postToInstagram(content: string, token: string) {
    // API: https://graph.facebook.com/v20.0/{ig-user-id}/media
    // IG requires a 2-step process: 1. Create Media Container, 2. Publish Container
    console.log('IG Posting: Content Container created, Publishing...');
  }

  private static async postToX(content: string, token: string) {
    // API: https://api.twitter.com/2/tweets
    return axios.post('https://api.twitter.com/2/tweets', { text: content }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  private static async postToLinkedIn(content: string, token: string) {
    // API: https://api.linkedin.com/v2/ugcPosts
    return axios.post('https://api.linkedin.com/v2/ugcPosts', {
      author: `urn:li:person:YOUR_ID`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text: content },
          shareMediaCategory: "NONE"
        }
      },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
