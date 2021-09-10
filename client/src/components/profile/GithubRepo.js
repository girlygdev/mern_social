import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { getGithubRepos } from '../../actions/profile'

const GithubRepo = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    if (username) {
      console.log('get github')
      getGithubRepos(username)
    }
  }, [username, getGithubRepos])

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos.length > 0
        ? repos.map(repo => (
          <div className="repo bg-white p-1 my-1" key={repo.id}>
            <div>
              <h4><a href="#" target="_blank" rel="noopener noreferrer">{repo.name}</a></h4>
              <p>
                {repo.description ? repo.description : 'No description'}
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                <li className="badge badge-light">Forks: {repo.forks}</li>
              </ul>
            </div>
          </div>))
        : <h4>No Github Repository</h4>}
    </div>
  )
}

GithubRepo.propTypes = {
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  repos: state.profile.repos
})

export default connect(mapStateToProps, { getGithubRepos })(GithubRepo)
