pipeline {
  agent {
    kubernetes {
      yamlFile('agent-builder.yaml')
    }
  }

  environment {
    REGISTRY_IMAGE = "realkeny/todo-app"
    DOCKER_REGISTRY = "${env.REGISTRY_IMAGE}"
    IMAGE_TAG      = "${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
        steps {
            checkout scm
        }
    }
    
    stage('Install Dependencies') {
        steps {
            container('node') {
                sh 'npm ci'
            }
        }
    }
    
    stage('Lint') {
        steps {
            container('node') {
                sh 'npm run lint'
            }
        }
    }
    
    /*
    stage('Unit Tests') {
        steps {
            container('node') {
                sh 'npm run test:unit'
            }
        }
        post {
            always {
                junit 'reports/jest-*.xml'
            }
        }
    } 
    */
    
    stage('Build') {
        steps {
            container('node') {
                sh 'npm run build'
            }
        }
    }

    stage('Build & Push Container') {
      steps {
        container('kaniko') {
          sh """
            ls -la /kaniko/.docker/
            cat /kaniko/.docker/config.json | sed 's/"auth":.*/"auth": "REDACTED"/'
            /kaniko/executor \
              --context `pwd` \
              --dockerfile `pwd`/Dockerfile \
              --destination ${REGISTRY_IMAGE}:${IMAGE_TAG} \
              --destination ${REGISTRY_IMAGE}:latest \
              --snapshot-mode=redo \
              --use-new-run
          """
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        container('kubectl') {
          sh """
            sed -i "s|\${DOCKER_REGISTRY}|${DOCKER_REGISTRY}|g" deployment.yaml
            sed -i "s|\${IMAGE_TAG}|${IMAGE_TAG}|g" deployment.yaml
            kubectl apply -f deployment.yaml -n devops-tools
            kubectl set image deployment/react-app react-app=${REGISTRY_IMAGE}:${IMAGE_TAG} -n devops-tools
            kubectl rollout status deployment/react-app -n devops-tools --timeout=120s
          """
        }
      }
    }
  }
}
