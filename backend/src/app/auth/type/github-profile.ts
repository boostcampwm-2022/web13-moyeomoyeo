export interface GithubProfile {
  id: string;

  profileUrl: string;

  _json: {
    avatar_url: string;
    blog: string;
  };
}
